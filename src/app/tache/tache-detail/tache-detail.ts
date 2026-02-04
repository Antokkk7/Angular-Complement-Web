import { Component, inject, OnInit, signal } from '@angular/core';
import { Tache } from '../../models/tache';
import { TacheService } from '../../services/tache-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tache-detail',
  imports: [RouterLink],
  templateUrl: './tache-detail.html',
  styleUrl: './tache-detail.css',
})
export class TacheDetail implements OnInit {

  // tache : Tache = new Tache()
  public tache = signal<Tache> (new Tache())
  private tacheService  = inject(TacheService)
  private routeur       = inject(Router)
  private route         = inject(ActivatedRoute)

  constructor () { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    // const tache = this.tacheService.getTache(id)
    this.tacheService.getTache(id).subscribe({
      next:tache => this.tache.set(tache),
      error:err => this.routeur.navigateByUrl('/taches')
    })
    /*
    if (tache===undefined) {
      this.routeur.navigateByUrl('/taches')
    } else {
      this.tache = tache
    }
    */
  }
}
