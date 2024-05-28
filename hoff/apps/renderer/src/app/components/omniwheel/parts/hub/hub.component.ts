import { CommonModule } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, HostListener, OnDestroy, ViewChild, ViewContainerRef, inject, input } from '@angular/core'
import { ConfigService } from 'apps/renderer/src/app/services/config.service'
import { Subscription } from 'rxjs'
import { Node, Omniwheel } from 'shared'
import { ModalConfigFormComponent } from '../../../config-form/modal-config-form.component'
import { NodeComponent } from '../node/node.component'

// TODO: set title for host element to something like "Open Omniwheel Configuration"

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, NodeComponent, ModalConfigFormComponent],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubComponent implements OnDestroy, AfterViewInit {
  private configService = inject(ConfigService)
  private subs: Subscription[] = []
  private nodes: NodeComponent[] = []
  private vcr = inject(ViewContainerRef);
  private modalConfigRef: ComponentRef<ModalConfigFormComponent> | null = null;

  @ViewChild('wheelNodeContainer', { read: ViewContainerRef })
  private wheelNodeContainer!: ViewContainerRef

  config = input.required<Omniwheel>()

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // prevent bubbling
    event.stopImmediatePropagation()
    event.stopPropagation()

    if (this.modalConfigRef) {
      // prevent multiple modals from being open at once
      return;
    }

    this.modalConfigRef = this.vcr.createComponent(ModalConfigFormComponent)
    this.modalConfigRef.changeDetectorRef.detectChanges()
    this.modalConfigRef.instance.close.subscribe(() => {
      this.modalConfigRef?.destroy()
    })
    this.modalConfigRef.onDestroy(() => {
      this.modalConfigRef = null
    })
  }



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
