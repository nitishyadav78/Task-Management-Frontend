import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. Ye import zaroori hai
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 2. Yahan add karein
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  // 3. Naye task ke liye object initialize karein
  newTask: Task = {
    title: '',
    description: '',
    status: 'TODO'
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  // 4. Save function jo list ko turant update karega
  saveQuickTask() {
    if (this.newTask.title.trim()) {
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.loadTasks(); // List reload karein
          this.newTask = { title: '', description: '', status: 'TODO' }; // Form clear karein
        },
        error: (err) => console.error('Save failed:', err)
      });
    }
  }

  deleteTask(id: number | undefined) {
    if (id && confirm('Delete karein?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}