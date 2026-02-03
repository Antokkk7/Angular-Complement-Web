import { Component, inject, OnInit } from '@angular/core';
import { Tache } from '../../models/tache';
import { TacheService } from '../../services/tache-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tache-detail',
  imports: [RouterLink],
  templateUrl: './tache-detail.html',
  styleUrl: './tache-detail.css',
})
export class TacheDetail {

  tache : Tache = new Tache()
  private tacheService  = inject(TacheService)
  private routeur       = inject(Router)
  private route         = inject(ActivatedRoute)

  constructor () { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    const tache = this.tacheService.getTache(id)
    if (tache===undefined) {
      this.routeur.navigateByUrl('/taches')
    } else {
      this.tache = tache
    }
  }
}
