import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private apiUrl = 'http://localhost:3000/routines';

  constructor(private http: HttpClient) { }

  // Récup les routines
  getRoutines(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récup l'id d'une routine
  getRoutineById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer une routine
  createRoutine(routine: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, routine);
  }

  // Maj une routine
  updateRoutine(id: number, routine: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, routine);
  }

  // Suppr une routine
  deleteRoutine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
