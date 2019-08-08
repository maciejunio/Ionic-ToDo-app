import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Task } from '../models/task';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  userId: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService) {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }


  getTodo(id: string) {
    return this.db.collection(`tasks/${this.userId}/taskdetail`).doc(id).valueChanges();
  }
  add(task: Task) {
    this.db.collection(`tasks/${this.userId}/taskdetail`).add(task);
  }
  remove(task: Task) {
    this.db.collection(`tasks/${this.userId}/taskdetail`).doc(task.id).delete();
  }
  done(task: Task) {
    task.end = new Date().toLocaleDateString();
    this.db.collection(`tasks/${this.userId}/taskdetail`).doc(task.id).update({ isDone: true, end: task.end });
  }
}
