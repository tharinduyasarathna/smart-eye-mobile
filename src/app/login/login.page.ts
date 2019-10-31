import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  NavController,
  LoadingController,
  AlertController,
  ToastController,
  MenuController
} from "@ionic/angular";
import { AuthenticateService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = "";
  selectedVal: string;
  responseMessage: string = "";
  responseMessagetype: string = "";
  emailInput: string;
  passwordInput: string;
  isForgetPassword: boolean;
  userDetails: any;

  /**
   * 
   * @param navCtrl This used for navigation controlling
   * @param authService This used for authentication services
   * @param formBuilder This used for use formbuilder
   * @param menuCtrl This used for menu controller
   * @param toastCtrl This used for toast controller
   * @param alertCtrl This used for alert controller
   * @param loadingCtrl This used for loading controller
   * @param router This used for routing purposes
   * @param storage This used for use local storage
   * @param alertService This used for alert services
   */

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage,
    private alertService:AlertService
  ) {
    this.selectedVal = "login";
    this.isForgetPassword = false;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  /**
   * When the app will fire and put validators to the login
   */

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long."
      }
    ]
  };

  /**
   * 
   * @param value get the credentials for the login user
   */
  loginUser(value) {
    this.authService.loginUser(value).then(
      authenticatedUserData => {
        this.errorMessage = "";
        this.alertService.presentToast("Logged In");
        this.navCtrl.navigateForward("/dashboard");
        this.authService
          .getUser(authenticatedUserData.user.uid)
          .subscribe(user => {
           // localStorage.setItem("logged_in_user", JSON.stringify(user.data()));
           this.storage.set("logged_in_user", JSON.stringify(user.data())).then(v=>{
             
           });
          });
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }

  /**
   * Send link on given email to reset password
   */
  
  forgotPass() {
    this.authService.sendPasswordResetEmail(this.emailInput).then(
      res => {
        console.log(res);
        this.isForgetPassword = false;
        this.showMessage("success", "Please Check Your Email");
      },
      err => {
        this.showMessage("danger", err.Message);
      }
    );
  }

  /**
   * Comman Method to Show Message and Hide after 2 seconds
   * @param type get the response message type
   * @param msg hold the message
   */
  
  showMessage(type, msg) {
    this.responseMessagetype = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

}
