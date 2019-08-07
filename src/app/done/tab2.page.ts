import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../service/task.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tasksDone: Observable<any[]>;
  userId: string;
  
  public swipe: number = 0;
  

  constructor(
    private tasksTaskservice: TaskService,
    private db: AngularFirestore,
    private authService: AuthService,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.tasksDone = db.collection(`tasks/${this.userId}/taskdetail`, ref => ref.where('isDone', '==', true)).valueChanges({ idField: 'id' });
      }
    });
  }
  swipeEvent(e, task) {
    this.swipe++;
    console.log(task);
  }
  
}
