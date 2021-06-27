import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drag-father',
  templateUrl: './drag-father.component.html',
  styleUrls: ['./drag-father.component.css']
})
export class DragFatherComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Drag and drop');
  }

}
