import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './omniwheel.component.html',
  styleUrl: './omniwheel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmniwheelComponent {}
