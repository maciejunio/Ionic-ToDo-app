import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
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
