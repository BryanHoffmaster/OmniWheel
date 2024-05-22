import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, ViewContainerRef, inject, input } from '@angular/core'
import { ConfigService } from 'apps/renderer/src/app/services/config.service'
import { Subscription } from 'rxjs'
import { Node, Omniwheel } from 'shared'
import { NodeComponent } from '../node/node.component'

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, NodeComponent],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent implements OnDestroy, AfterViewInit {
  private configService = inject(ConfigService)
  private nodes: NodeComponent[] = []
  private subs: Subscription[] = []

  @ViewChild('wheelNodeContainer', { read: ViewContainerRef })
  private wheelNodeContainer!: ViewContainerRef

  config = input.required<Omniwheel>()

  ngAfterViewInit() {
    this.buildNodes(this.config().nodes)
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  buildNodes(wheelNodes: Node[]): void {
    const nodes = wheelNodes.map((nodeConfig) => {
      const nodeRef = this.wheelNodeContainer.createComponent(NodeComponent)
      nodeRef.setInput('config', nodeConfig)

      // TODO: Test this memory leak prevention when you start
      //       tracking node component instance updates
      // nodeRef.onDestroy(() => {
      //   this.nodes = this.nodes.filter((n) => n.config().id !== nodeRef.instance.config().id)
      // })

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
