import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errMsg: string;

  readonly authState$: Observable<User | null> = this.angularFire.authState;

  constructor(private angularFire: AngularFireAuth, private router: Router, public alertController: AlertController) {
  }

  async loginErr(errMsg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: errMsg,
      buttons: ['OK'],
      cssClass: 'test'
    });

    await alert.present();
  }

  // Logowanie
  login(email: string, password: string) {
    return this.angularFire.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigateByUrl('/tabs');
    }).catch(err => {
      this.errMsg = err.message;
      this.loginErr(this.errMsg);
    }
    );
  }

  // Rejestracja
  register(email: string, password: string) {
    return this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(respone => {
      this.router.navigateByUrl('/tabs');
    }).catch(err => {
      this.errMsg = err.message;
      this.loginErr(this.errMsg);
    });
  }
  // Logowanie z google
  async  loginWithGoogle() {
    await this.angularFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigateByUrl('/tabs');
  }

  // Wylogowanie
  logOut() {
    this.router.navigate(['/login']);
    return this.angularFire.auth.signOut();
  }
}
