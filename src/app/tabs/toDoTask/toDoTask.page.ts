import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Task } from '../../models/task';

import { TaskService } from '../../service/task.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'toDoTask.page.html',
  styleUrls: ['toDoTask.page.scss']
})
export class ToDoTaskPage {

  tasks: Observable<Task[]>;
  toastMsg: string;

  constructor(
    private tasksTaskservice: TaskService,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
  ) {
    this.authService.authState$.subscribe(user =>{
      this.tasks = db.collection(
        `tasks/${user.uid}/taskdetail`, ref => {
          return ref.where('isDone', '==', false);
        }).valueChanges({ idField: 'id' });
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

  remove(task: Task) {
    this.tasksTaskservice.remove(task);
    this.toastMsg = 'Zadanie usunięte';
    this.presentToast(this.toastMsg);
  }
  done(task: Task) {
    this.tasksTaskservice.done(task);
    this.toastMsg = 'Zadanie wykonane';
    this.presentToast(this.toastMsg);
  }
  addTask() {
    this.router.navigateByUrl('/add-task');
  }
}

