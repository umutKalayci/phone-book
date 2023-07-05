import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-card-header',
  templateUrl: './mat-card-header.component.html',
  styleUrls: ['./mat-card-header.component.scss'],
})
export class MatCardHeaderComponent {
  @Input() text = '';
}
