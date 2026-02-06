import { Component, Input } from '@angular/core';
import { EtatTache, Tache } from '../../models/tache';
import { NgClass } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { TacheService } from '../../services/tache-service';

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
  
  constructor(private router: Router, private tacheService: TacheService) {}
  
  public onAffiche(): void {
    this.router.navigate(['/taches', this.tache.id]);
  }
  
  public onProgresse(): void {
    switch (this.tache.etat) {
      case EtatTache.AFAIRE:
        this.tache.etat = EtatTache.ENCOURS;
        break;
      case EtatTache.ENCOURS:
        this.tache.etat = EtatTache.TERMINEE;
        break;
    }
    this.enregistrerTache();
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
    this.enregistrerTache();
  }

  private enregistrerTache(): void {
    this.tacheService.updateTache(this.tache).subscribe({
      next: () => {
      },
      error: err => {
      }
    });
  }

  public onSupprime(): void {
    if (confirm("Voulez-vous réellement supprimer cette tâche")) {
      console.log('Suppression')
      this.tacheService.deleteTache(this.tache.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/').then(
            () => this.router.navigateByUrl('/taches')
          )
        },
        error: err => {
          console.log("Erreur de suppression : ", err)
        }
      })
    } else {
      console.log('Ok, on ne supprime pas')
    }
  }
}
