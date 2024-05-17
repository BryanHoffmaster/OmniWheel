import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { Node } from 'shared';

type NodeComponentInput<T> = {
  [K in keyof T]: Signal<T[K]|undefined>
}

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent implements NodeComponentInput<Node> {
  nodeData = input<Node>()
  id = computed(()=> this.nodeData()?.id)
  name = computed(()=> this.nodeData()?.name)
  tooltip = computed(()=> this.nodeData()?.tooltip)
  img = computed(()=> this.nodeData()?.img)
  bgColor = computed(()=> this.nodeData()?.bgColor)
  textColor = computed(()=> this.nodeData()?.textColor)
  rotate = computed(()=> this.nodeData()?.rotate)
  radius = computed(()=> this.nodeData()?.radius)
  curvature = computed(()=> this.nodeData()?.curvature)
  action = computed(()=> this.nodeData()?.action)

  constructor() {
    console.log('NodeComponent.constructor', this.nodeData());
  }
}
