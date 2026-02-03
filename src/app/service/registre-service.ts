import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistreService {
  public nomSociete: String = "nom-du-garage"

  constructor() {
    console.log("Création du service de registre")
  }
}
