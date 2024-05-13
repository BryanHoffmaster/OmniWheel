import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShellServiceService } from '../../services/shell-service.service';

@Component({
  selector: 'app-shell-tester',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell-tester.component.html',
  styleUrl: './shell-tester.component.scss',
})
export class ShellTesterComponent {

  shellService = inject(ShellServiceService);

  runCommand = (value: string) => {
    this.shellService.runCommand(value)
  }
}
