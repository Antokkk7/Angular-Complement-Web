import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercisesService } from '../fitness/exercises.service';
import { RoutinesService } from '../fitness/routines.service';
import { CompletionService } from '../fitness/completion.service';

@Component({
  selector: 'app-routine-exercises',
  imports: [CommonModule],
  templateUrl: './routine-exercises.html',
  styleUrl: './routine-exercises.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutineExercises implements OnInit {
  exercises: any[] = [];
  routine: any = null;
  loading = true;
  error: string | null = null;
  routineId: number | null = null;
  totalRepetitions = 0;
  totalWeight = 0;

  constructor(
    private exercisesService: ExercisesService,
    private routinesService: RoutinesService,
    private completionService: CompletionService,
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

    // load la routine
    this.routinesService.getRoutineById(this.routineId).subscribe({
      next: (routine) => {
        this.routine = routine;

        // puis les exercices
        this.exercisesService.getRoutineExercises(this.routineId!).subscribe({
          next: (data) => {
            this.exercises = data;
            this.calculateTotals();
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
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la routine';
        this.loading = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  // calcul des reps et du poids
  calculateTotals(): void {
    this.totalRepetitions = 0;
    this.totalWeight = 0;

    this.exercises.forEach(exercise => {
      this.totalRepetitions += exercise.repetitions || 0;
      // Ajouter le poids seulement si =/= 0
      if (exercise.weight && exercise.weight > 0) {
        this.totalWeight += exercise.weight;
      }
    });
  }

  // retour
  goBack(): void {
    this.router.navigate(['/routines-liste']);
  }

  // refresh
  refresh(): void {
    this.loadRoutineExercises();
  }

  // Routine faite ou non faite
  toggleExerciseCompletion(exerciseId: number): void {
    if (this.completionService.isExerciseCompleted(exerciseId)) {
      this.completionService.unmarkExercise(exerciseId);
      // Si on décoche un exercice, ça décoche aussi la routine 
      if (this.routineId && this.completionService.isRoutineCompleted(this.routineId)) {
        this.completionService.unmarkRoutine(this.routineId);
      }
    } else {
      this.completionService.markExerciseCompleted(exerciseId);
    }
    this.cdr.markForCheck();
  }

  isExerciseCompleted(exerciseId: number): boolean {
    return this.completionService.isExerciseCompleted(exerciseId);
  }

  markAllExercisesCompleted(): void {
    const exerciseIds = this.exercises.map(e => e.id);
    this.completionService.markAllExercisesCompleted(exerciseIds);
    this.cdr.markForCheck();
  }
}
