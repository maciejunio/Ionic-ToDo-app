import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async passwordErr() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Passwords do not match',
      buttons: ['OK'],
      cssClass: 'test'
    });

    await alert.present();
  }

  register(formData: NgForm) {
    if (formData.value.password !== formData.value.rePassword) {
      formData.reset();
      this.passwordErr();
      return false;
    } else {
      this.authService.register(formData.value.email, formData.value.password);
    }

  }
  loginReturn() {
    this.router.navigateByUrl('/login');
  }
}
