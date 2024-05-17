import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent {}
