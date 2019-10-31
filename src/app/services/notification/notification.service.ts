import { Injectable } from "@angular/core";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private notifications: LocalNotifications) {}

  /**
   * This method can be used to schedule a notification
   */
  scheduleANotification = (title,msg) => {
    // this.notifications.schedule({
    //   title:"ABC",
    //   text: "Delayed ILocalNotification",
    // });
  };
}
