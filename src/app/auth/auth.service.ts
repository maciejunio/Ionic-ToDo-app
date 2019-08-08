import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errMsg: string;

  readonly authState$: Observable<User | null> = this.angularFire.authState;

  constructor(private angularFire: AngularFireAuth, private router: Router, public alertController: AlertController) {
  }

  async showErr(errMsg) {
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
    return this.angularFire.auth.signInWithEmailAndPassword(email, password);
  }

  // Rejestracja
  register(email: string, password: string) {
    return this.angularFire.auth.createUserWithEmailAndPassword(email, password);
  }
  // Logowanie z google
  async  loginWithGoogle() {
    await this.angularFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigateByUrl('/tabs');
  }

  // Wylogowanie
  logOut() {
    this.angularFire.auth.signOut();
    this.router.navigate(['/login']);
  }
}
