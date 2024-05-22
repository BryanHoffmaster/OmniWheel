import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Omniwheel } from 'shared';
import { ConfigService } from '../../services/config.service';
import { HubComponent } from './parts/hub/hub.component';
import { NodeComponent } from './parts/node/node.component';
import { SpokeComponent } from './parts/spoke/spoke.component';

@Component({
  selector: 'app-omniwheel',
  standalone: true,
  imports: [CommonModule, SpokeComponent, HubComponent, NodeComponent],
  templateUrl: './omniwheel.component.html',
  styleUrl: './omniwheel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmniwheelComponent implements OnDestroy {
  private configService = inject(ConfigService);
  private containerRef = inject(ViewContainerRef);

  private nodes: NodeComponent[] = [];
  private subs: Subscription[] = [];

  constructor() {
    this.subs.push(
      this.configService.omniwheel$.subscribe((omniwheel) => {
        this.containerRef.clear();
        this.buildNodes(omniwheel);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  buildNodes(omniwheel: Omniwheel) {
    const nodes = omniwheel.nodes.map((nodeConfig) => {
      const nodeRef = this.containerRef.createComponent(NodeComponent);
      nodeRef.setInput('config', nodeConfig);
      return nodeRef.instance;
    });
    this.nodes = nodes;
  }

  randomizeNodeColors(): void {
    this.configService.randomizeNodeConfig();
  }
}
