import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private apiUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) { }

  // Récup les exercices
  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récup les exercices d'une routine
  getRoutineExercises(routineId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/routines/${routineId}/exercises`);
  }

  // Récup les exercices d'une routine (via l'id)
  getExercisesByRoutineId(routineId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?routineId=${routineId}`);
  }

  // Récup l'id d'un exercice
  createExercise(exercise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exercise);
  }

  // Maj un exercice
  updateExercise(id: number, exercise: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exercise);
  }

  // Suppr un exercice
  deleteExercise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
