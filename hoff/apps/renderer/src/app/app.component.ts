import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OmniwheelComponent } from './components/omniwheel/omniwheel.component';
import { ShellTesterComponent } from './components/shell-tester/shell-tester.component';

@Component({
  standalone: true,
  imports: [RouterModule, ShellTesterComponent, OmniwheelComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'renderer';
}
