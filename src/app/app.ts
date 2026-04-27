import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',      // Check karein ki ye 'app.html' hai ya 'app.component.html'
  styleUrl: './app.css'           // Ye change karein: './app.component.css' ko hata kar './app.css' likhein
})
export class AppComponent {
  title = 'task-app';
}