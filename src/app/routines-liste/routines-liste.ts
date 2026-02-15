import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutinesService } from '../fitness/routines.service';
import { ExercisesService } from '../fitness/exercises.service';
import { CompletionService } from '../fitness/completion.service';

@Component({
  selector: 'app-routines-liste',
  imports: [CommonModule],
  templateUrl: './routines-liste.html',
  styleUrl: './routines-liste.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutinesListe implements OnInit {
  routines: any[] = [];
  allRoutines: any[] = [];
  loading = true;
  error: string | null = null;
  filterStatus: string = 'all';
  showOnlyCompleted = false;

  constructor(
    private routinesService: RoutinesService,
    private exercisesService: ExercisesService,
    private completionService: CompletionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showOnlyCompleted = params['completed'] === 'true';
      this.loadRoutines();
    });
  }

  // charge les routines
  loadRoutines(): void {
    this.loading = true;
    this.error = null;
    this.routinesService.getRoutines().subscribe({
      next: (data) => {
        this.allRoutines = data;
        this.applyFilter();
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

  // applique le filtre
  applyFilter(): void {
    let filtered = this.allRoutines;

    // Filtre par statut (active & inactive)
    if (this.filterStatus === 'active') {
      filtered = filtered.filter(r => r.status === 'active');
    } else if (this.filterStatus === 'inactive') {
      filtered = filtered.filter(r => r.status === 'inactive');
    }

    // filtrer les routines complétées
    if (this.showOnlyCompleted) {
      filtered = filtered.filter(r => this.completionService.isRoutineCompleted(r.id));
    }

    this.routines = filtered;
    this.cdr.markForCheck();
  }

  // met le filtre
  setFilter(status: string): void {
    this.filterStatus = status;
    this.applyFilter();
  }

  // Coche ou décoche routine et les exercices de la routine
  toggleRoutineCompletion(routineId: number): void {
    if (this.completionService.isRoutineCompleted(routineId)) {
      this.completionService.unmarkRoutine(routineId);
      this.exercisesService.getRoutineExercises(routineId).subscribe({
        next: (exercises) => {
          exercises.forEach(exercise => {
            this.completionService.unmarkExercise(exercise.id);
          });
          this.cdr.markForCheck();
        }
      });
    } else {
      this.completionService.markRoutineCompleted(routineId);
      this.exercisesService.getRoutineExercises(routineId).subscribe({
        next: (exercises) => {
          exercises.forEach(exercise => {
            this.completionService.markExerciseCompleted(exercise.id);
          });
          this.cdr.markForCheck();
        }
      });
    }
    this.cdr.markForCheck();
  }

  // Vérif si une routine est complétée
  isRoutineCompleted(routineId: number): boolean {
    return this.completionService.isRoutineCompleted(routineId);
  }

  // clear
  resetAllCompletions(): void {
    if (confirm('Êtes-vous sûr de vouloir remettre toutes les complétions à zéro ?')) {
      this.completionService.resetAll();
      this.cdr.markForCheck();
    }
  }

  // refresh
  refresh(): void {
    this.loadRoutines();
  }

  // navigation
  viewRoutineExercises(routineId: number): void {
    this.router.navigate([`/routines/${routineId}/exercises`]);
  }

  // modif
  editRoutine(routineId: number): void {
    this.router.navigate([`/routines/edit/${routineId}`]);
  }

  // ajout
  addRoutine(): void {
    this.router.navigate(['/routines/new']);
  }
}
