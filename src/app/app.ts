import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-todo');

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToRoutinesFaites() {
    this.router.navigate(['/routines-liste'], { queryParams: { completed: true } });
  }

  navigateToExercicesFaits() {
    this.router.navigate(['/exercises-liste'], { queryParams: { completed: true } });
  }
}
