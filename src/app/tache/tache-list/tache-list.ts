import { Component } from '@angular/core';
import { EtatTache, Tache } from '../../models/tache';
import { TacheItem } from '../tache-item/tache-item';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [TacheItem],
  templateUrl: './tache-list.html',
  styleUrl: './tache-list.css',
})
export class TacheList {
  public taches: Tache[] = [
    {
      id: 2,
      nom: "Sortir du lit",
      etat: EtatTache.TERMINEE,
      memo: "Dès que le réveil sonne et ne pas se laisser absorber par mon téléphone portable",
    },
    {
      id: 3,
      nom: "Faire de l'activité physique",
      etat: EtatTache.ENCOURS,
      memo: "Liste des exercices à compléter ici...",
    },
    {
      id: 6,
      nom: "Partir pour l'IUT",
      etat: EtatTache.AFAIRE,
      memo: "Sauf le W.E. ;-)",
    },
  ];
}
