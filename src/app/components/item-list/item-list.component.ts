import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() itemIsSelected = false;
  @Input() header?: string;
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  add() {
    this.onAdd.emit();
  }
  delete() {
    this.onDelete.emit();
  }
  save() {
    this.onSave.emit();
  }
}
