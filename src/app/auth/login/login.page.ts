import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  alertMsg: string;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  async showAlert(alertMsg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: alertMsg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password).then(() => {
      this.router.navigateByUrl('/tabs');
    }).catch(err => {
      this.alertMsg = err.message;
      this.showAlert(this.alertMsg);
    });
  }

  logOut() {
    this.authService.logOut();
  }
  register() {
    this.router.navigateByUrl('/register');
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
