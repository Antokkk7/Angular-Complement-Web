import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtatTache, Tache } from '../../models/tache';
import { TacheItem } from '../tache-item/tache-item';
import { TacheService } from '../../services/tache-service';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [TacheItem, RouterLink, AsyncPipe, FormsModule],
  templateUrl: './tache-list.html',
  styleUrl: './tache-list.css',
})
export class TacheList implements OnInit {

  private tacheService = inject(TacheService)

  // public taches: Tache[] = []
  public taches! : Observable<Tache[]>
  public loadingState!: Observable<'loading' | 'success' | 'error'>
  public etatSelectionne: EtatTache | 'tous' = 'tous'
  public textRecherche: string = ''

  constructor( ) { }

  ngOnInit() : void {
    const etatSauvegarde = sessionStorage.getItem('etatFiltre')
    if (etatSauvegarde) {
      this.etatSelectionne = etatSauvegarde as EtatTache | 'tous'
    }

    this.taches = this.tacheService.getTaches()
    this.loadingState = this.taches.pipe(
      map(() => 'success' as const),
      startWith('loading' as const),
      catchError(() => of('error' as const))
    )
  }

  onEtatChange(nouvelEtat: EtatTache | 'tous'): void {
    this.etatSelectionne = nouvelEtat
    sessionStorage.setItem('etatFiltre', nouvelEtat)
  }

  filtrerTaches(taches: Tache[]): Tache[] {
    let resultat = taches

    if (this.etatSelectionne !== 'tous') {
      resultat = resultat.filter(tache => tache.etat === this.etatSelectionne)
    }

    if (this.textRecherche.trim() !== '') {
      resultat = resultat.filter(tache => 
        tache.nom.toLowerCase().includes(this.textRecherche.toLowerCase())
      )
    }

    return resultat
  }
}
