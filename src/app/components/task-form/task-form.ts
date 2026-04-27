import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html'
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', status: 'TODO' };
  isEditMode = false;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskService.getTasks().subscribe((tasks: Task[]) => {
        const existingTask = tasks.find(t => t.id === +id);
        if (existingTask) this.task = { ...existingTask };
      });
    }
  }

  saveTask() {
    console.log("Sending to Backend:", this.task);
    if (this.isEditMode && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.taskService.createTask(this.task).subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}