import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voiture',
  imports: [FormsModule],
  templateUrl: './voiture.html',
  styleUrl: './voiture.css',
})
export class Voiture {
  @Input()
  public marque:  string = "Renault"
  public vitesse: number = Math.round(Math.random() * 130)

  public onAcceleration(): void {
    this.vitesse += 4
  }
  public onFreinage(): void {
    this.vitesse -= 6
  }
}
