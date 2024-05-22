import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core'
import { Subscription } from 'rxjs'
import { Omniwheel } from 'shared'
import { ConfigService } from '../../services/config.service'
import { HubComponent } from './parts/hub/hub.component'
import { NodeComponent } from './parts/node/node.component'
import { SpokeComponent } from './parts/spoke/spoke.component'

@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule, SpokeComponent, HubComponent, NodeComponent],
  templateUrl: './omniwheel.component.html',
  styleUrl: './omniwheel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmniwheelComponent implements OnDestroy {
  private configService = inject(ConfigService)
  private hubs: ComponentRef<HubComponent>[] = []
  private subs: Subscription[] = []

  @ViewChild('hubContainer', { read: ViewContainerRef,static: false }) wheelNodeContainer!: ViewContainerRef


  constructor() {
    this.subs.push(
      this.configService.omniwheel$.subscribe((omniwheel) => {
        this.buildHub(omniwheel)
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  buildHub(omniwheel: Omniwheel) {
    const hubRef = this.wheelNodeContainer.createComponent(HubComponent)
    hubRef.setInput('config', omniwheel)
    hubRef.changeDetectorRef.detectChanges()
    this.hubs.push(hubRef)
  }
}
