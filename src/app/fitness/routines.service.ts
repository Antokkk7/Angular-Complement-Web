import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {
  private apiUrl = 'http://localhost:3000/routines';

  constructor(private http: HttpClient) { }

  getRoutines(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
