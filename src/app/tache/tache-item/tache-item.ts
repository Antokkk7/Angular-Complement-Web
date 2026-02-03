import { Component, Input } from '@angular/core';
import { EtatTache, Tache } from '../../models/tache';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tache-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tache-item.html',
  styleUrl: './tache-item.css',
})
export class TacheItem {
  @Input()
  public tache: Tache = new Tache();

  public readonly EtatTache = EtatTache;
}
