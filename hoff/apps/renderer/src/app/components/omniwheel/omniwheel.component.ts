import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './omniwheel.component.html',
  styleUrl: './omniwheel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmniwheelComponent {}
