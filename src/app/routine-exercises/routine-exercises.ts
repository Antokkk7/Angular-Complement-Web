import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesService } from '../fitness/exercises.service';

@Component({
  selector: 'app-routine-exercises',
  imports: [CommonModule],
  templateUrl: './routine-exercises.html',
  styleUrl: './routine-exercises.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutineExercises implements OnInit {
  exercises: any[] = [];
  loading = true;
  error: string | null = null;
  routineId: number | null = null;

  constructor(
    private exercisesService: ExercisesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routineId = params['id'];
      if (this.routineId) {
        this.loadRoutineExercises();
      }
    });
  }

  loadRoutineExercises(): void {
    if (!this.routineId) return;

    this.loading = true;
    this.error = null;
    this.exercisesService.getRoutineExercises(this.routineId).subscribe({
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

  goBack(): void {
    this.router.navigate(['/routines-liste']);
  }

  refresh(): void {
    this.loadRoutineExercises();
  }
}
