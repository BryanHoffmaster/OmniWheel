import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  inject,
  input
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { Node } from 'shared';
import { ShellServiceService } from '../../../../services/shell-service.service';


//TODO: Later, test out using rem to adjust for different screen sizes, plus changing root font size for a "zoom" effect.
//TODO: Add option to "sync" height and width for all nodes, needs to determine which is larger.
//TODO: id's should be unique for better tracking and referencing
//TODO: Add option(s) for shadows and/or glows, colors, and opacities to your node config!

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent implements OnDestroy {
  shellService = inject(ShellServiceService);
  hostElementRef = inject(ElementRef);
  renderer = inject(Renderer2)
  config = input.required<Node>(); // TODO: nodeConfig instead of nodeData for more specificity
  subscribers: Subscription[] = [];

  constructor(){
    const subscriber = toObservable(this.config).subscribe((nodeData) => {
      if (nodeData) {
        // NOTE: Angular custom "host" element needs a type of display, otherwise the browser doesn't know how work the block level
        //       properties of a "non native element" https://nitayneeman.com/posts/solving-a-styling-issue-for-rendered-components-in-angular/
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'align-items', 'center');

        // TODO: This needs work, need to have items "wrappable", with line-height/font-size adjustments, AND use flex-direction COLUMN as your direction basis!
        // NOTE: This is set to display the text "as-is" from the node config text array, so multiple entries will be on new lines
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'flex-wrap', 'wrap');
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'text-wrap', 'nowrap');



        this.renderer.setAttribute(this.hostElementRef.nativeElement, 'id', nodeData.id);
        this.renderer.setAttribute(this.hostElementRef.nativeElement, 'data-name', nodeData.name);
        this.renderer.setAttribute(this.hostElementRef.nativeElement, 'title', nodeData.tooltip)

        this.renderer.setStyle(this.hostElementRef.nativeElement, 'background-image', nodeData.img); // TODO: you'll have to setup something to make sure the string format is correct
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'color', nodeData.textColor);
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'background-color', nodeData.bgColor);
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'border-radius', `${nodeData.curvature}px`);
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'transform', `rotate(${nodeData.rotate}deg)` );
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'width', `${nodeData.width}px`);
        this.renderer.setStyle(this.hostElementRef.nativeElement, 'height', `${nodeData.height}px`);

        // TODO: Should this always set
        nodeData.text.forEach((text) => {
          const newTextNode = document.createTextNode(text);
          this.hostElementRef.nativeElement.appendChild(newTextNode);
        });
      }
    });

    this.subscribers.push(subscriber)
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }


  @HostListener('click')
  onClick() {
    this.config()?.action.forEach((action) => {
      if (action.type === 'openFile') {
        this.shellService.openFile(action.input);
      }
      if (action.type === 'command') {
        this.shellService.runCommand(action.input);
      }
    });
  }
}
