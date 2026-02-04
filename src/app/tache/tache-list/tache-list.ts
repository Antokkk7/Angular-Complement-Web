import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { EtatTache, Tache } from '../../models/tache';
import { TacheItem } from '../tache-item/tache-item';
import { TacheService } from '../../services/tache-service';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [TacheItem, RouterLink, AsyncPipe],
  templateUrl: './tache-list.html',
  styleUrl: './tache-list.css',
})
export class TacheList implements OnInit {

  private tacheService = inject(TacheService)

  // public taches: Tache[] = []
  public taches! : Observable<Tache[]>

  constructor( ) { }

  ngOnInit() : void {
    // this.taches = this.tacheService.getTaches()
    this.taches = this.tacheService.getTaches()
  }
 
}
