import { Routes } from '@angular/router';
import { TacheList } from './tache/tache-list/tache-list';
import { TacheDetail } from './tache/tache-detail/tache-detail';
import { Accueil } from './accueil/accueil';

export const routes: Routes = [
    { path: 'taches',       component:TacheList },
    { path: 'taches/:id',   component:TacheDetail },
    { path: '',             component:Accueil, pathMatch:'full' },
    { path: '**',           redirectTo: '' },
];
