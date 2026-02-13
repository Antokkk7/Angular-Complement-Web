import { Routes } from '@angular/router';
import { RoutinesListe } from './routines-liste/routines-liste';
import { ExercisesListe } from './exercises-liste/exercises-liste';
import { RoutineExercises } from './routine-exercises/routine-exercises';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'routines-liste', component: RoutinesListe },
  { path: 'exercises-liste', component: ExercisesListe },
  { path: 'routines/:id/exercises', component: RoutineExercises },
];
