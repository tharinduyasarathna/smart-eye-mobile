import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class AuthenticateService {

  /**
   * 
   * @param angularFireAuth  Used for the angular fireauth
   * @param afs  Used for the angular firestore
   */
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

/**
 * 
 * @param value Creating a user in with the given credentials
 */

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   * 
   * @param value Loggin with the given credentials
   */

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, window.btoa(value.password))
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   * Logout from the current user session
   */

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  }

  /**
   * Retrive the current user details from firebase authentication
   */

  userDetails() {
    return firebase.auth().currentUser;
  }

  /**
   * send email verification to verify email before user login
   */
  async sendEmailVarification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  /**
   * send email verification when user forgot password
   * @param passwordResetEmail email address 
   */

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(
      passwordResetEmail
    );
  }

  /**
   * logout from that user session
   */
  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }

  /**
   * get relevent user from firestore considering the user id
   * @param uid user id related to firestore
   */
  getUser(uid) {
    return this.afs
      .collection("users")
      .doc(uid)
      .get();
  }
}
