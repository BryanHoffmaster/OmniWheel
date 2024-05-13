import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellTesterComponent } from './components/shell-tester/shell-tester.component';

@Component({
  standalone: true,
  imports: [RouterModule, ShellTesterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'renderer';
}
