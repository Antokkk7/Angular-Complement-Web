import { Component } from '@angular/core';
import { Voiture } from '../voiture/voiture';

@Component({
  selector: 'app-garage',
  imports: [Voiture],
  templateUrl: './garage.html',
  styleUrl: './garage.css',
})  
export class Garage {
  public nom: String = "FP-Auto"
  
  public onRenommer(): void {
    this.nom = this.nom.split('').reverse().join('')
  }
}
