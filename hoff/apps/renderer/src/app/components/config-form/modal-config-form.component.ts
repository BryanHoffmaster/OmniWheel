import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewContainerRef, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-modal-config-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-config-form.component.html',
  styleUrl: './modal-config-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfigFormComponent {
  private vcr = inject(ViewContainerRef)
  private configService = inject(ConfigService)

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close: EventEmitter<void> = new EventEmitter<void>()

  // setup a simple close emitter for the parent to destroy
  onClose() {
    this.close.emit()
  }

  // Need an import type function to pull in the current config and loop over all
  // the options and have them build the form dynamically.
}
