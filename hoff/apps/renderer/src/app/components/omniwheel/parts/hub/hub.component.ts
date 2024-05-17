import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent {}
