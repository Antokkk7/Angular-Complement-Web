import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesService } from '../fitness/exercises.service';

@Component({
  selector: 'app-exercises-liste',
  imports: [CommonModule],
  templateUrl: './exercises-liste.html',
  styleUrl: './exercises-liste.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListe implements OnInit {
  exercises: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private exercisesService: ExercisesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.error = null;
    this.exercisesService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des exercices';
        this.loading = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  refresh(): void {
    this.loadExercises();
  }
}
