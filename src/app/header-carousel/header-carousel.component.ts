import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header-carousel.component.html',
  styleUrl: './header-carousel.component.css'
})
export class HeaderCarouselComponent {

  @Input()
  pictures: Array<string>;

  @Input()
  title: string
}
