import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellTesterComponent } from './components/shell-tester/shell-tester.component';
import { ConfigService } from './services/config.service';

@Component({
  standalone: true,
  imports: [RouterModule, ShellTesterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'renderer';

  // TODO: REMOVE THIS AFTER GETTING THIS SERVICE ACTUALLY INJECTED INTO SOMETHING!!
  configService = inject(ConfigService);
  constructor() {
    console.info(`Angular renderer app started!`);
  }
}
