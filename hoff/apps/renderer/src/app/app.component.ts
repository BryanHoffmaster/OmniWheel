import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellTesterComponent } from './components/shell-tester/shell-tester.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ShellTesterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'renderer';
}
