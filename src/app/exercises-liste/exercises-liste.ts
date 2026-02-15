import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../fitness/exercises.service';
import { CompletionService } from '../fitness/completion.service';

@Component({
  selector: 'app-exercises-liste',
  imports: [CommonModule],
  templateUrl: './exercises-liste.html',
  styleUrl: './exercises-liste.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListe implements OnInit {
  exercises: any[] = [];
  allExercises: any[] = [];
  loading = true;
  error: string | null = null;
  showOnlyCompleted = false;

  constructor(
    private exercisesService: ExercisesService,
    private completionService: CompletionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showOnlyCompleted = params['completed'] === 'true';
      this.loadExercises();
    });
  }

  // Charge les exercices
  loadExercises(): void {
    this.loading = true;
    this.error = null;
    this.exercisesService.getExercises().subscribe({
      next: (data) => {
        this.allExercises = data;
        this.applyFilter();
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

  // Applique le filtre : afficher les exercices complétés / tous les exercices
  applyFilter(): void {
    if (this.showOnlyCompleted) {
      this.exercises = this.allExercises.filter(e => this.completionService.isExerciseCompleted(e.id));
    } else {
      this.exercises = this.allExercises;
    }
    this.cdr.markForCheck();
  }

  // recharge la liste
  refresh(): void {
    this.loadExercises();
  }
}
