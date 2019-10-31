import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /**
   * 
   * @param toastController This used for toast controller
   */
  constructor(private toastController: ToastController) { }

  /**
   * Comman Method to Show Toast Message
   * @param message Holds the message
   */

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}