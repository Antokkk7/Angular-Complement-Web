import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TacheList } from './tache/tache-list/tache-list';
import { Menu } from "./menu/menu";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
