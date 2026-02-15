import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompletionService {
  private storageKey = 'fitness_completions';

  constructor() { }

  // Récup toutes les complétions
  getCompletions(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : { routines: {}, exercises: {} };
  }

  // Met une routine comme complétée
  markRoutineCompleted(routineId: number): void {
    const completions = this.getCompletions();
    completions.routines[routineId] = new Date().toISOString().split('T')[0];
    localStorage.setItem(this.storageKey, JSON.stringify(completions));
  }

  // Met uune routine comme non complétée
  unmarkRoutine(routineId: number): void {
    const completions = this.getCompletions();
    delete completions.routines[routineId];
    localStorage.setItem(this.storageKey, JSON.stringify(completions));
  }

  // Vérif si une routine est finie
  isRoutineCompleted(routineId: number): boolean {
    const completions = this.getCompletions();
    return completions.routines.hasOwnProperty(routineId);
  }

  // Marquer un exercice comme fini
  markExerciseCompleted(exerciseId: number): void {
    const completions = this.getCompletions();
    completions.exercises[exerciseId] = new Date().toISOString().split('T')[0];
    localStorage.setItem(this.storageKey, JSON.stringify(completions));
  }

  // Retire la marque "fini" d'un exercice
  unmarkExercise(exerciseId: number): void {
    const completions = this.getCompletions();
    delete completions.exercises[exerciseId];
    localStorage.setItem(this.storageKey, JSON.stringify(completions));
  }

  // Vérif si un exercice est fini
  isExerciseCompleted(exerciseId: number): boolean {
    const completions = this.getCompletions();
    return completions.exercises.hasOwnProperty(exerciseId);
  }

  // Marque tous les exercices d'une routine comme finis
  markAllExercisesCompleted(exerciseIds: number[]): void {
    const completions = this.getCompletions();
    exerciseIds.forEach(id => {
      completions.exercises[id] = new Date().toISOString().split('T')[0];
    });
    localStorage.setItem(this.storageKey, JSON.stringify(completions));
  }

  // Hard reset
  resetAll(): void {
    localStorage.removeItem(this.storageKey);
  }
}
