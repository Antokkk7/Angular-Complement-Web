import { Component, inject } from '@angular/core';
import { Voiture } from "../voiture/voiture";
import { RegistreService } from '../service/registre-service';

@Component({
  selector: 'app-garage',
  imports: [Voiture],
  templateUrl: './garage.html',
  styleUrl: './garage.css',
})
export class Garage {

  // Injection du service via la syntaxe fonctionnelle moderne
  private readonly serviceRegistre = inject(RegistreService);

  public nom: string = "FP-Auto"
  public marques: string[] = ["Audi", "Renault", "Peugeot"]

  constructor() {
    console.log("Et hop un nouveau garage !")
    // On initialise le nom du garage avec celui du service
    this.nom = this.serviceRegistre.nomSociete
  }

  public onRenommer(): void {
    this.nom = this.nom.split('').reverse().join('')
    this.nom += '*'
    // Et on enregistre la modification dans le service Registre
    this.serviceRegistre.nomSociete = this.nom
  }
}
