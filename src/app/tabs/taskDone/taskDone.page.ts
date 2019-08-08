import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Task } from '../../models/task';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'taskDone.page.html',
  styleUrls: ['taskDone.page.scss']
})
export class TaskDonePage {

  tasksDone: Observable<Task[]>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService) {
    this.authService.authState$.subscribe(user => {
      this.tasksDone = db.collection(
        `tasks/${user.uid}/taskdetail`,
        ref => ref.where('isDone', '==', true)).valueChanges({ idField: 'id' });
    });
  }
}
