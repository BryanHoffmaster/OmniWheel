import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core'
import { Subscription } from 'rxjs'
import { Omniwheel } from 'shared'
import { ConfigService } from '../../services/config.service'
import { HubComponent } from './parts/hub/hub.component'
import { SpokeComponent } from './parts/spoke/spoke.component'

// TODO: This article will tell you all you need to know about how to handle trig functions to get the right angle https://web.dev/articles/css-trig-functions
// TODO: Use the renderer2.setClass() function to programmatically set global CSS variables!


@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule, SpokeComponent, HubComponent],
  templateUrl: './omniwheel.component.html',
  styleUrl: './omniwheel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmniwheelComponent implements OnDestroy,AfterViewInit {
  private configService = inject(ConfigService)
  private hubs: ComponentRef<HubComponent>[] = []
  private subs: Subscription[] = []

  @ViewChild('hubContainer', { read: ViewContainerRef })
  private wheelNodeContainer!: ViewContainerRef

  ngAfterViewInit() {
    this.subs.push(
      this.configService.omniwheel$.subscribe((omniwheel) => {
        this.buildHub(omniwheel)
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  buildHub(omniwheel: Omniwheel): void {
    this.hubs.forEach((hub) => hub.destroy()) // NOTE: prevents stacking hubs and memory leaks
    const hubRef = this.wheelNodeContainer.createComponent(HubComponent)
    hubRef.setInput('config', omniwheel)
    hubRef.changeDetectorRef.detectChanges()
    this.hubs = [hubRef]
  }
}
