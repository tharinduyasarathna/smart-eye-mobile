import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database'

import { IonicModule } from "@ionic/angular";

import { DashboardPage } from "./dashboard.page";
import { IonicStorageModule } from "@ionic/storage";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
