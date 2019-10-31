import { DomSanitizer } from "@angular/platform-browser";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Component, OnInit } from "@angular/core";
import {
  NavController,
  PopoverController,
  MenuController
} from "@ionic/angular";
import { AuthenticateService } from "../services/authentication.service";
import { NotificationsComponent } from "../components/notifications/notifications.component";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import { NotificationService } from "../services/notification/notification.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  /**
   * 
   */
  public weatherSearchForm: FormGroup;
  userEmail: string;
  enableNotifications: any;
  triggeralarm: false;
  lastImg = "";

  /**
   * 
   * @param authService This used for authentication services
   * @param navCtrl This used for navigation controlling
   * @param menuCtrl This used for menu controller
   * @param popoverCtrl This used for popover controller
   * @param afs This used for angular firestore
   * @param activeRouter This used for activate routes
   * @param notificationService This used for notification services
   * @param db This used for angular firedatabase
   */
  constructor(
    private authService: AuthenticateService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private afs: AngularFirestore,
    public activeRouter: ActivatedRoute,
    private notificationService: NotificationService,
    private db: AngularFireDatabase
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  /**
   * when fire app get latest captured image and alarm status
   */

  ngOnInit() {
    this.afs
      .collection("images", ref => ref.orderBy("timestamp", "desc"))
      .valueChanges()
      .subscribe(data => {
        this.lastImg = "data:image/png;base64," + data[0]["imgUrl"];
        //console.log('this.lastImg', this.lastImg)
      });
    this.afs
      .collection("metadata")
      .doc("common-settings")
      .valueChanges()
      .subscribe(data => {
        this.triggeralarm = data["triggeralarm"];
      });

    //this.notificationService.scheduleANotification();
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack("");
    }
  }

  /**
   * logout user from the application
   */
  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * 
   * @param ev get the event for notifications
   */

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  /**
   * controlling the alaram status with the firestore
   */

  checkboxToggle = (type: string) => {
    if (type == "triggeralarm") {
      console.log("type", this.triggeralarm);
      this.afs
        .collection("metadata")
        .doc("common-settings")
        .update({
          triggeralarm: !this.triggeralarm
        });
      if (this.triggeralarm == false) {
        this.db.database.ref().set({
          LED_STATUS: "ON"
        });
      } else {
        this.db.database.ref().set({
          LED_STATUS: "OFF"
        });
      }
    }
  };
}
