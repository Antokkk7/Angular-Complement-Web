import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoutinesService } from '../fitness/routines.service';
import { ExercisesService } from '../fitness/exercises.service';

@Component({
  selector: 'app-edit-routine',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-routine.html',
  styleUrl: './edit-routine.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRoutine implements OnInit {
  isNew = true;
  routine: any = {
    name: '',
    description: '',
    status: 'active'
  };
  exercises: any[] = [];
  currentExercise: any = {
    name: '',
    repetitions: 0,
    weight: 0
  };
  showAddExerciseForm = false;
  editingExerciseIndex: number | null = null;
  routineId: number | null = null;

  constructor(
    private routinesService: RoutinesService,
    private exercisesService: ExercisesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.routineId = params['id'];
        this.isNew = false;
        this.loadRoutine();
      }
    });
  }

  // Charge la routine et ses exercices
  loadRoutine(): void {
    if (!this.routineId) return;

    this.routinesService.getRoutineById(this.routineId).subscribe({
      next: (routine) => {
        this.routine = routine;
        this.loadExercises();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la routine', err);
      }
    });
  }

  // Charge les exercices (est appeler juste au dessus)
  loadExercises(): void {
    if (!this.routineId) return;

    this.exercisesService.getExercisesByRoutineId(this.routineId).subscribe({
      next: (data) => {
        this.exercises = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des exercices', err);
      }
    });
  }

  // le formulaire d'ajout/modif 
  toggleAddExercise(): void {
    this.showAddExerciseForm = !this.showAddExerciseForm;
    if (!this.showAddExerciseForm) {
      this.resetExerciseForm();
    }
  }

  // Ajoute ou modifie un exercice
  addOrUpdateExercise(): void {
    if (!this.currentExercise.name) return;

    if (this.editingExerciseIndex !== null) {
      // s'il existe
      this.exercises[this.editingExerciseIndex] = { ...this.currentExercise };
      this.editingExerciseIndex = null;
    } else {
      // s'il n'existe pas
      this.exercises.push({ ...this.currentExercise });
    }

    this.resetExerciseForm();
    this.showAddExerciseForm = false;
    this.cdr.markForCheck();
  }

  // Modifie un exercice
  editExercise(index: number): void {
    this.currentExercise = { ...this.exercises[index] };
    this.editingExerciseIndex = index;
    this.showAddExerciseForm = true;
    this.cdr.markForCheck();
  }

  // Au revoir
  removeExercise(index: number): void {
    const exercise = this.exercises[index];

    if (exercise.id) {
      this.exercisesService.deleteExercise(exercise.id).subscribe({
        next: () => {
          this.exercises.splice(index, 1);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'exercice', err);
        }
      });
    } else {
      this.exercises.splice(index, 1);
      this.cdr.markForCheck();
    }
  }

  // clear
  resetExerciseForm(): void {
    this.currentExercise = {
      name: '',
      repetitions: 0,
      weight: 0
    };
    this.editingExerciseIndex = null;
  }

  onSubmit(formulaire: any): void {
    if (!formulaire.valid) return;

    if (this.isNew) {
      // nouvelle routine...
      const newRoutine = {
        name: this.routine.name,
        description: this.routine.description,
        creationDate: new Date().toISOString().split('T')[0],
        status: this.routine.status
      };

      this.routinesService.createRoutine(newRoutine).subscribe({
        next: (newRoutineData: any) => {
          this.saveExercises(newRoutineData.id);
        },
        error: (err) => {
          console.error('Erreur lors de la création de la routine', err);
        }
      });
    } else {
      // Modifier la routine existante
      const updatedRoutine = {
        id: this.routine.id,
        name: this.routine.name,
        description: this.routine.description,
        creationDate: this.routine.creationDate,
        status: this.routine.status
      };

      this.routinesService.updateRoutine(this.routineId!, updatedRoutine).subscribe({
        next: () => {
          this.saveExercises(this.routineId!);
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la routine', err);
        }
      });
    }
  }

  // Sauvegarde des exercices
  saveExercises(routineId: number): void {
    // Tableau pour garder les promesses/observables
    let completeCount = 0;

    if (this.exercises.length === 0) {
      this.router.navigate(['/routines-liste']);
      return;
    }

    // Parcourir chaque exercice
    this.exercises.forEach(exercise => {
      // hehehe
      const exerciseData = {
        id: exercise.id,
        routineId: routineId,
        name: exercise.name,
        repetitions: exercise.repetitions,
        weight: exercise.weight
      };

      if (exercise.id) {
        // Exercice existant donc maj
        this.exercisesService.updateExercise(exercise.id, exerciseData).subscribe({
          next: () => {
            completeCount++;
            if (completeCount === this.exercises.length) {
              this.router.navigate(['/routines-liste']);
            }
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de l\'exercice', err);
            completeCount++;
            if (completeCount === this.exercises.length) {
              this.router.navigate(['/routines-liste']);
            }
          }
        });
      } else {
        // Nouvel exercice donc création
        const newExerciseData = {
          routineId: routineId,
          name: exercise.name,
          repetitions: exercise.repetitions,
          weight: exercise.weight
        };

        this.exercisesService.createExercise(newExerciseData).subscribe({
          next: () => {
            completeCount++;
            if (completeCount === this.exercises.length) {
              this.router.navigate(['/routines-liste']);
            }
          },
          error: (err) => {
            console.error('Erreur lors de la création de l\'exercice', err);
            completeCount++;
            if (completeCount === this.exercises.length) {
              this.router.navigate(['/routines-liste']);
            }
          }
        });
      }
    });
  }

  deleteRoutine(): void {
    if (!this.routineId) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette routine ? Les exercices associés seront aussi supprimés.')) {
      // Suppr la routine
      this.routinesService.deleteRoutine(this.routineId).subscribe({
        next: () => {
          // Supprimer les exercices associés (PS : penser à mettre un bouton pour reset la BD !!!!!!!!!!!!!!!!)
          this.exercises.forEach(exercise => {
            this.exercisesService.deleteExercise(exercise.id).subscribe();
          });
          this.router.navigate(['/routines-liste']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la routine', err);
        }
      });
    }
  }
}
