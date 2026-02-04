import { Injectable } from '@angular/core';
import { EtatTache, Tache } from '../models/tache';
import { getTestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private taches : Tache[] = [
    {
      id  : 2,
      nom : "Sortir du lit",
      etat: EtatTache.TERMINEE,
      memo: "Dès que le réveil sonne, ne pas jump sur le tél"
    },
    {
      id  : 3,
      nom : "Boire de l'eau",
      etat: EtatTache.AFAIRE,
      memo: "Boire."
    },
    {
      id  : 5,
      nom : "Faire du sport",
      etat: EtatTache.ENCOURS,
      memo: "Sport à faire."
    },
    {
      id  : 6,
      nom : "Partir pour l'IUT",
      etat: EtatTache.AFAIRE,
      memo: "Sauf le W.E hehehe."
    },
  ]

constructor() { }
getTaches() : Tache[] {
  return this.taches;
}

getTache (id:number) : Tache | undefined {
  return this.taches.find( t => t.id == id)
}

addTache(nouvelleTache:Tache) : Tache {
  nouvelleTache.id = 1 + this.taches[this.taches.length-1].id
  this.taches.push(nouvelleTache)
  return nouvelleTache
}

updateTache(tache: Tache) {
  const tachIn = this.getTache(tache.id)
  if (tachIn) {
    Object.assign(tachIn, tache)
  }
}

}