import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistreService {

  public nomSociete: string = "nom-du-garage"

  constructor() {
    console.log("Création du service registre")
  }
}