import { FcmService } from "./services/fcm/fcm.service";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Pages } from "./pages";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages: Array<Pages>;
  currentUser;
  currentUserEmail;

  /**
   *
   * @param platform This used for provide current platform
   * @param splashScreen This used for provide splash screen
   * @param navCtrl This used for navigation controlling
   * @param storage This used for local storage
   * @param fcm This usede for anguler fire cloud messaging
   */

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public navCtrl: NavController,
    private storage: Storage,
    private fcm: FcmService
  ) {
    this.appPages = [
      {
        title: "Home",
        url: "/dashboard",
        direct: "root",
        icon: "home"
      },
      {
        title: "History",
        url: "/history",
        direct: "forward",
        icon: "stopwatch"
      },
      {
        title: "Settings",
        url: "/settings",
        direct: "forward",
        icon: "cog"
      },
      {
        title: "About",
        url: "/about",
        direct: "forward",
        icon: "information-circle-outline"
      }
    ];

    this.initializeApp();
    this.storage.get("logged_in_user").then(user => {
      this.currentUser = JSON.parse(user).name;
      this.currentUserEmail = JSON.parse(user).email;
      console.log("this.currentUser", this.currentUser);
    });
    this.fcm.getPermission().then(() => {
      this.fcm.sub("images");
      this.fcm.showMessages();
    });
  }

  /**
   * When the fire app it will subscribe the topic
   */

  initializeApp() {
    this.platform
      .ready()
      .then(() => {
        (window as any).statusBar.styleDefault();
        this.splashScreen.hide();
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  /**
   * Logout from the current user session
   */

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot("/");
    location.reload();
  }
}
