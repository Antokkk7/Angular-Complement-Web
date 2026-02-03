import { Component, Input } from '@angular/core';
import { EtatTache, Tache } from '../../models/tache';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tache-item',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './tache-item.html',
  styleUrl: './tache-item.css',
})
export class TacheItem {
  @Input()
  public tache: Tache = new Tache();

  public readonly EtatTache = EtatTache;
  
  public onProgresse(): void {
    switch (this.tache.etat) {
      case EtatTache.AFAIRE:
        this.tache.etat = EtatTache.ENCOURS;
        break;
      case EtatTache.ENCOURS:
        this.tache.etat = EtatTache.TERMINEE;
        break;
    }
  }

  public onRegresse(): void {
    switch (this.tache.etat) {
      case EtatTache.TERMINEE:
        this.tache.etat = EtatTache.ENCOURS
        break;
        case EtatTache.ENCOURS:
          this.tache.etat = EtatTache.AFAIRE
          break;
    }
  }
}
