import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-label',
  standalone: true,
  imports: [],
  templateUrl: './tag-label.component.html',
  styleUrl: './tag-label.component.scss'
})
export class TagLabelComponent {
  @Input() icon!: string;
  @Input() text!: string;
}
