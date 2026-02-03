import { Component, inject } from '@angular/core';
import { Voiture } from '../voiture/voiture';
import { RegistreService } from '../service/registre-service';

@Component({
  selector: 'app-garage',
  imports: [Voiture],
  templateUrl: './garage.html',
  styleUrl: './garage.css',
})  
export class Garage {

  private readonly serviceRegistre = inject(RegistreService)

  public nom: String = "FP-Auto"
  public marques: String[] = ["Audi", "Renault", "Peugeot"]
  
  constructor() {
    console.log("Et hop un nouveau garage !")
    this.nom = this.serviceRegistre.nomSociete
  }

  public onRenommer(): void {
    this.nom = this.nom.split('').reverse().join('')
    this.nom += ''

    this.serviceRegistre.nomSociete = this.nom
  }
}
