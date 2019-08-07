import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from '../service/task.service';
import { Task } from '../models/task';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  tasks: Observable<any[]>;
  userId: string;
  toastMsg: string;

  constructor(
    private alertCtrl: AlertController,
    private tasksTaskservice: TaskService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.tasks = db.collection(`tasks/${this.userId}/taskdetail`, ref => ref.where('isDone', '==', false)).valueChanges({ idField: 'id' });
      }
    });

  }
  
  async presentToast(toastMsg) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }

  logOut() {
    this.authService.logOut();
  }

  remove(task) {
    this.tasksTaskservice.remove(task);
    this.toastMsg = 'Zadanie usunięte';
    this.presentToast(this.toastMsg);
  }
  done(task) {
    this.tasksTaskservice.done(task);
    this.toastMsg = 'Zadanie wykonane';
    this.presentToast(this.toastMsg);
  }
  addTask() {
    this.router.navigateByUrl('/add-task');
  }
}

