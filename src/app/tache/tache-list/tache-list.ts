import { Component, inject } from '@angular/core';
import { EtatTache, Tache } from '../../models/tache';
import { TacheItem } from '../tache-item/tache-item';
import { TacheService } from '../../services/tache-service';

@Component({
  selector: 'app-tache-list',
  standalone: true,
  imports: [TacheItem],
  templateUrl: './tache-list.html',
  styleUrl: './tache-list.css',
})
export class TacheList {
  public taches: Tache[] = []
  private tacheService = inject(TacheService)

  constructor( ) { }

  ngOnInit() : void {
    this.taches = this.tacheService.getTaches()
  }
 
}
