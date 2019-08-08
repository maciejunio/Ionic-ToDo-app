import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  alertMsg: string;
  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) { }


  async showAlert(alertMsg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: alertMsg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  register(formData: NgForm) {
    if (formData.value.password !== formData.value.rePassword) {
      formData.reset();
      this.alertMsg = 'Passwords do not match';
      this.showAlert(this.alertMsg);
      return false;
    }
    this.authService.register(formData.value.email, formData.value.password).then(() => {
      this.router.navigateByUrl('/tabs');
      this.alertMsg = 'Account was successfully created';
      this.showAlert(this.alertMsg);
    }).catch(err => {
      this.alertMsg = err.message;
      this.showAlert(this.alertMsg);
    });
  }
  loginReturn() {
    this.router.navigateByUrl('/login');
  }
}
