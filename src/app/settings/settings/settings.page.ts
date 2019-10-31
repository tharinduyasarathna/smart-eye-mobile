import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  enableHistory: false;

  appLanguage: any = ["English", "Portuguese", "French"];

  notification: false;

  constructor(public navCtrl: NavController, private afs: AngularFirestore) {}

  ngOnInit() {
    this.afs
      .collection("metadata")
      .doc("mobile-app-settings")
      .valueChanges()
      .subscribe(data => {
        //this.enableNotification = data["notification"];
        this.enableHistory = data["enableHistory"];
      });

      this.afs
      .collection("metadata")
      .doc("common-settings")
      .valueChanges()
      .subscribe(data => {
        this.notification = data["notification"];
        
      });
  }

  editProfile() {
    this.navCtrl.navigateForward("edit-profile");
  }

  checkboxToggle = (type: string) => {
    if (type === "notification") {
      this.afs
        .collection("metadata")
        .doc("common-settings")
        .update({
          notification: !this.notification
        });
    } else if (type == "enableHistory") {
      this.afs
        .collection("metadata")
        .doc("mobile-app-settings")
        .update({
          enableHistory: !this.enableHistory
        });
    } else {
      this.afs
        .collection("metadata")
        .doc("mobile-app-settings")
        .update({
          appLanguage: "English"
        });
    }
  };

  logout() {
    this.navCtrl.navigateRoot("/");
  }
}
