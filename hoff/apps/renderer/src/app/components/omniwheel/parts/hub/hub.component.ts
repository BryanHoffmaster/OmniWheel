import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, ViewContainerRef, inject, input } from '@angular/core'
import { ConfigService } from 'apps/renderer/src/app/services/config.service'
import { Subscription } from 'rxjs'
import { Node, Omniwheel } from 'shared'
import { NodeComponent } from '../node/node.component'

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent implements OnDestroy, AfterViewInit {
  private configService = inject(ConfigService)
  private nodes: NodeComponent[] = []
  private subs: Subscription[] = []

  @ViewChild('wheelNodeContainer', { read: ViewContainerRef,static: false }) wheelNodeContainer!: ViewContainerRef

  config = input.required<Omniwheel>()

  constructor() {
    // this.renderer.addClass(this.containerRef.element.nativeElement, 'hub')
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.subs.push(
      this.configService.omniwheel$.subscribe((omniwheel) => {
        // TODO: should I get more granular here with just nodes$?
        this.buildNodes(omniwheel.nodes)
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  buildNodes(wheelNodes: Node[]) {
    const nodes = wheelNodes.map((nodeConfig) => {
      const nodeRef = this.wheelNodeContainer.createComponent(NodeComponent)
      nodeRef.setInput('config', nodeConfig)

      // TODO: Test this memory leak prevention!!
      nodeRef.onDestroy(() => {
        this.nodes = this.nodes.filter((n) => n.config().id !== nodeRef.instance.config().id)
      })

      // this.renderer.appendChild(this.containerRef.element.nativeElement, nodeRef.location.nativeElement)
      nodeRef.changeDetectorRef.detectChanges()

      return nodeRef.instance
    })

    this.nodes = nodes
  }

  // TODO: keep this(?) and move to hub config form
  randomizeNodeColors(): void {
    this.configService.randomizeNodeConfig()
  }
}
