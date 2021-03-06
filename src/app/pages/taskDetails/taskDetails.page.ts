import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './taskDetails.page.html',
  styleUrls: ['./taskDetails.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  id: string;
  task: Task;

  constructor(private tasksTaskservice: TaskService, private route: ActivatedRoute, private nav: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadTask();
    }
  }
  async loadTask() {
    this.tasksTaskservice.getTodo(this.id).subscribe(res => {
      this.task = res;
    });
  }
}
