import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Garage } from './garage/garage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Garage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-td');
}
