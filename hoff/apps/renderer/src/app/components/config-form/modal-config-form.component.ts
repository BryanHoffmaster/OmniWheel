import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-modal-config-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-config-form.component.html',
  styleUrl: './modal-config-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfigFormComponent {}
