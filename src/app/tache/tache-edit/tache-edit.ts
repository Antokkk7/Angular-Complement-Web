import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { Tache, EtatTache } from '../../models/tache';
import { TacheService } from '../../services/tache-service';

@Component({
  selector: 'app-tache-edit',
  imports: [FormsModule, RouterLink, KeyValuePipe],
  templateUrl: './tache-edit.html',
  styleUrl: './tache-edit.css',
})
  export class TacheEdit implements OnInit {
    public tache = signal(new Tache());
    readonly etatTache = EtatTache;

    constructor(
      private tacheService: TacheService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      /*const id = this.route.snapshot.params['id'];
      
      if (id !== undefined) {
        const tacheTrouvee = this.tacheService.getTache(id);
        if (tacheTrouvee) {
          this.tache = { ...tacheTrouvee };
        }
      } */
    const idTache = this.route.snapshot.params['id'];
    this.tache.set(new Tache());
    if (idTache) {
      this.tacheService.getTache(idTache).subscribe({
        next: tache => this.tache.set({ ...tache }),
        error: err => this.router.navigateByUrl('/taches')
      });
    }
    }

    public onSubmit(leFormulaire: NgForm): void {
      /*if (!leFormulaire.valid) {
        return;
      }

      if (this.tache.id === 0) {
        this.tacheService.addTache(this.tache);
      } else {
        this.tacheService.updateTache(this.tache);
      }

      this.router.navigate(['/taches']);
    }*/
    
    /*if (leFormulaire.valid) {
        if (this.tache().id) {
          this.tacheService.updateTache(this.tache())
        } else {
          this.tacheService.addTache(this.tache())
        }
    } */

    if (leFormulaire.valid) {
      let ObservableAction
      if (this.tache().id) {
        ObservableAction = this.tacheService.updateTache(this.tache())
      } else {
        ObservableAction = this.tacheService.addTache(this.tache())
      }
      ObservableAction.subscribe({
        next: tache => {
          console.log("Enregistrement OK : ", tache)
          this.router.navigateByUrl('/taches')
        },
        error: err => {
          console.log("Erreur de sauvegarde : ", err)
        }
      })
    }
  }
}