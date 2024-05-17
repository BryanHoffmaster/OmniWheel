import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spoke',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spoke.component.html',
  styleUrl: './spoke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpokeComponent {}
