import { ImageData } from './../models/image-data';
import { HistoryService } from './../services/history/history.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  imageData:Observable<ImageData[]>;
  loaderToShow: any;

  /**
   * 
   * @param navCtrl This used for navigation controlling
   * @param historyService This used for Load history service 
   * @param loadingController This used for Loding controller setup
   */

  constructor(
    public navCtrl: NavController,
    private historyService: HistoryService,
    public loadingController: LoadingController
  ) { }

  /**
   * When the app fires, show the loader when load the history images
   */

  ngOnInit() {
   
    this.showAutoHideLoader();
    this.imageData = this.historyService.getImages();
  }

  /**
   * Page loder configurations are here
   */
  
  showAutoHideLoader() {
    this.loadingController.create({
      message: 'Please Wait !',
      duration: 4000
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 4 Seconds');
      });
    });
  }

  
  
}
