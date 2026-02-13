import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private apiUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRoutineExercises(routineId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/routines/${routineId}/exercises`);
  }
}
