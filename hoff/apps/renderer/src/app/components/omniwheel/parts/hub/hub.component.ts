import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent {}
