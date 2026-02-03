import { Routes } from '@angular/router';
import { Garage } from './garage/garage';
import { Atelier } from './atelier/atelier';

export const routes: Routes = [
  { path: '', component: Garage, pathMatch: 'full' },
  { path: 'garage', component: Garage },
  { path: 'atelier', component: Atelier },
  { path: '**', redirectTo: '' },
];