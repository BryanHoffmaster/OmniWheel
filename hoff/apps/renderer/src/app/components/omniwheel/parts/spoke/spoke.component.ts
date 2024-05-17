import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spoke.component.html',
  styleUrl: './spoke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpokeComponent {}
