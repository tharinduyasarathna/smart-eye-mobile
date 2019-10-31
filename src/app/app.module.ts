import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FcmService } from './services/fcm/fcm.service';
import { IonicStorageModule } from '@ionic/storage';
import { HistoryService } from './services/history/history.service';
import { NotificationService } from "./services/notification/notification.service";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
import { AuthenticateService } from "./services/authentication.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {
  AngularFirestoreModule,
  AngularFirestore
} from "@angular/fire/firestore";

import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { NgxPaginationModule } from 'ngx-pagination';

import * as firebase from "firebase";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireFunctionsModule } from '@angular/fire/functions';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  entryComponents: [NotificationsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticateService,
    AngularFirestore,
    NotificationService,
    HistoryService,
    LocalNotifications,
    FcmService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
