import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoutinesService } from '../fitness/routines.service';

@Component({
  selector: 'app-routines-liste',
  imports: [CommonModule],
  templateUrl: './routines-liste.html',
  styleUrl: './routines-liste.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutinesListe implements OnInit {
  routines: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private routinesService: RoutinesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines(): void {
    this.loading = true;
    this.error = null;
    this.routinesService.getRoutines().subscribe({
      next: (data) => {
        this.routines = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des routines';
        this.loading = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  refresh(): void {
    this.loadRoutines();
  }

  viewRoutineExercises(routineId: number): void {
    this.router.navigate([`/routines/${routineId}/exercises`]);
  }
}
