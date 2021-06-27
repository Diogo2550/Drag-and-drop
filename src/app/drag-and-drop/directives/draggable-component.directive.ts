import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { element, promise } from 'protractor';

@Directive({
  selector: '[appDraggableComponent]'
})
export class DraggableComponentDirective {

  isMoving = false;
  offset:{x,y} = {x:'', y:''};
  clone: HTMLElement;
  currentDroppable;
  elementBelow: HTMLElement;
  interval;

  constructor(private element: ElementRef, 
              private renderer: Renderer2) { }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.offset.x = event.clientX - target.offsetLeft;
    this.offset.y = event.clientY - target.offsetTop;
    
    this.isMoving = true;
    this.element.nativeElement.style.position = 'absolute';
    this.element.nativeElement.style.left = `${event.clientX - this.offset.x}px`;
    this.element.nativeElement.style.top = `${event.clientY - this.offset.y}px`;

    this.clone = this.renderer.createElement('div') as HTMLElement;
    this.renderer.setStyle(this.clone, 'height', `${target.clientHeight}px`);
    this.renderer.setStyle(this.clone, 'width', `${target.clientWidth}px`);
    this.renderer.setStyle(this.clone, 'background-color', `#EAEAEA`);

    this.renderer.insertBefore(this.element.nativeElement.parentNode, this.clone, this.element.nativeElement);

    this.logSeconds();
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    //console.log('mouse moveu!');
    if(!this.isMoving) return;

    this.element.nativeElement.style.left = `${event.clientX - this.offset.x}px`;
    this.element.nativeElement.style.top = `${event.clientY - this.offset.y}px`;
    
    this.elementBelow = this.getElementBelow(event.clientX, event.clientY);
    
    if(!this.elementBelow) return;
    
    let droppableBelow = this.elementBelow.closest('[appDroppableComponent]');
    let draggableBelow = this.elementBelow.closest('[appDraggableComponent]');
    if(droppableBelow && droppableBelow != this.currentDroppable) {
      this.onDroppableChange(droppableBelow);
    } else if(draggableBelow) {
      this.onDraggableMove(draggableBelow, event);
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    //console.log('mouse subiu!');
    if(this.isMoving) {
      const elementBelow = this.getElementBelow(event.clientX, event.clientY);

      this.renderer.insertBefore(this.clone.parentNode, this.element.nativeElement, this.clone);
      this.element.nativeElement.style.position = 'initial';

      this.clone.remove();
      this.isMoving = false;
    }

    this.stopLog();
  }

  private onDroppableChange(droppableBelow: Element): void {
    this.currentDroppable = droppableBelow;
    this.renderer.appendChild(droppableBelow, this.clone);
  }

  private onDraggableMove(droppableBelow: Element, event: MouseEvent): void {
    const element = droppableBelow as HTMLElement;
    const halfDroppablePosition = element.offsetTop + (element.offsetHeight / 2);
    if(event.clientY > halfDroppablePosition + (element.offsetHeight / 8)) {
      console.log('baixooo');
      droppableBelow.parentElement.insertBefore(this.clone, droppableBelow.nextSibling);
    } else if(event.clientY < halfDroppablePosition - (element.offsetHeight / 8)) {
      console.log('cimaaa');
      droppableBelow.parentElement.insertBefore(this.clone, droppableBelow);
    }
  }

  private logSeconds() {
    this.interval = setInterval(() => {
      console.log(this.elementBelow);
    }, 1000);
  }

  private stopLog() {
    clearInterval(this.interval);
  }

  private getElementBelow(x: number, y: number): HTMLElement {
    this.element.nativeElement.hidden = true;
    const elementBelow = document.elementFromPoint(x, y);
    this.element.nativeElement.hidden = false;
    
    return elementBelow as HTMLElement;
  }

}
