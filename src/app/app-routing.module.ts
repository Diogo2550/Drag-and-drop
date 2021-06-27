import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragFatherComponent } from './drag-and-drop/drag-father/drag-father.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'drag-drop',
    pathMatch: 'full'
  },
  {
    path: 'drag-drop',
    component: DragFatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
