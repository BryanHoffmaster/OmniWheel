import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shell-tester',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell-tester.component.html',
  styleUrl: './shell-tester.component.scss',
})
export class ShellTesterComponent {

  runCommand = (value: string) => {
    console.log('runCommand', value);
  }
}
