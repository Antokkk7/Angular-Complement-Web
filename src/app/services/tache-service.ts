import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtatTache, Tache } from '../models/tache';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TacheService {

  // private taches : Tache[] = []

  readonly tacheAPI = environment.apiURL +"/taches"
  private http = inject(HttpClient)

  constructor() { }
    /* 
    this.http.get<Tache[]>(this.tacheAPI).subscribe({
      next: taches=> {
        this.taches.length=0
        this.taches.push(...taches)
      },
      error: err=>console.log("ERREUR LOAD TACHES", err)
    })
  }

  /
  const jsonTaches = localStorage.getItem('listeTaches')
    if (jsonTaches) {
      this.taches = JSON.parse(jsonTaches)
    } else {
      this.saveAllTaches()
    }
  } 

  private saveAllTaches() : void {
    localStorage['listeTaches']= JSON.stringify(this.taches)
  } */

  getTaches() : Observable<Tache[]> {
    return this.http.get<Tache[]>(this.tacheAPI)
  }

  getTache(id:number) : Observable<Tache> {
    return this.http.get<Tache>(this.tacheAPI+"/"+id)
  }

  /* addTache(nouvelleTache:Tache) : Tache {
    nouvelleTache.id = 1 + this.taches[this.taches.length-1].id
    this.taches.push(nouvelleTache)
    this.saveAllTaches()
    return nouvelleTache
  } */

  addTache(nouvelleTache:Tache) : Observable<Tache> {
    /* this.http.post<Tache>(this.tacheAPI, nouvelleTache).subscribe({
      next: tache=> {
        this.taches.push(tache)
      },
      error: err=>console.log("ERREUR ADDTACHE", err)
    }) 
    return nouvelleTache; */
    return this.http.post<Tache>(this.tacheAPI, nouvelleTache)
  }
  
  updateTache(tache: Tache) : Observable<Tache> {
    /* this.http.put<Tache>(this.tacheAPI+'/'+tache.id, tache).subscribe({
      next: tacheokBdd=>{
        const tacheIn = this.getTache(tache.id)
        if (tacheIn) {
          Object.assign(tacheIn, tacheokBdd)
        }
      },
      error: err=>console.log("ERREUR MODTACHE", err)
    })
  } */
    return this.http.put<Tache>(this.tacheAPI+'/'+tache.id, tache)
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(this.tacheAPI+'/'+id)
  }
}