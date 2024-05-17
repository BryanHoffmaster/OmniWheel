import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent {}
