import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { NgForm } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  task: Task;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  addTask(formData: NgForm) {
    const task: Task = ({ name: formData.value.name, created: new Date().toLocaleDateString(), isDone: false, priority: formData.value.priority });
    this.taskService.add(task);
    this.router.navigateByUrl('/tabs');
  }

}
