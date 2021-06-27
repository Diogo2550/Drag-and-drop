import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragFatherComponent } from './drag-father/drag-father.component';
import { DraggableComponentDirective } from './directives/draggable-component.directive';
import { DroppableComponentDirective } from './directives/droppable-component.directive';

@NgModule({
  declarations: [
    DragFatherComponent,
    DraggableComponentDirective,
    DroppableComponentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragFatherComponent
  ]
})
export class DragAndDropModule { }
