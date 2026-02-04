import { Component, OnInit } from '@angular/core';
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
  public tache: Tache = new Tache();
  readonly etatTache = EtatTache;

  constructor(
    private tacheService: TacheService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    
    if (id !== undefined) {
      const tacheTrouvee = this.tacheService.getTache(id);
      if (tacheTrouvee) {
        this.tache = { ...tacheTrouvee };
      }
    }
  }

  public onSubmit(leFormulaire: NgForm): void {
    if (!leFormulaire.valid) {
      return;
    }

    if (this.tache.id === 0) {
      this.tacheService.addTache(this.tache);
    } else {
      this.tacheService.updateTache(this.tache);
    }

    this.router.navigate(['/taches']);
  }

}
