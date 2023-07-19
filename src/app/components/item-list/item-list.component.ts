import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  screenWidth: number;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.screenWidth = window.innerWidth;
  }
  add() {
    this.onAdd.emit();
  }
  delete() {
    this.onDelete.emit();
  }
  save() {
    this.onSave.emit();
  }
  close() {
    this.router.navigateByUrl('/' + this.route.snapshot.url[0].path);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }
}
