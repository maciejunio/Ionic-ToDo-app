import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  userId: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  

  getTodo(id) {
    return this.db.collection(`tasks/${this.userId}/taskdetail`).doc(id).valueChanges();
  }
  add(task) {
    this.db.collection(`tasks/${this.userId}/taskdetail`).add(task);
  }
  remove(task) {
    this.db.collection(`tasks/${this.userId}/taskdetail`).doc(task.id).delete();
  }
  done(task) {
    task.end = new Date().toLocaleDateString();
    this.db.collection(`tasks/${this.userId}/taskdetail`).doc(task.id).update({ 'isDone': true, 'end': task.end});
  }
}
