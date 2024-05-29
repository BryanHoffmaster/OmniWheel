import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Omniwheel } from 'shared'
import { ConfigService } from '../../services/config.service'

@Component({
  selector: 'app-modal-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-config-form.component.html',
  styleUrl: './modal-config-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfigFormComponent implements OnInit, OnDestroy {
  private configService = inject(ConfigService)
  private formBuilder = inject(FormBuilder)
  private subs: Subscription[] = []

  //TODO: circle back and try to get this type set properly
  form!: FormGroup

  // TODO: fix this
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close: EventEmitter<void> = new EventEmitter<void>()

  // setup a simple close emitter for the parent to destroy
  onClose(): void {
    this.close.emit()
  }

  get nodes() {
    return this.form.get('nodes') as FormArray
  }

  hubKeys: string[] = []
  rimKeys: string[] = []
  axleKeys: string[] = []

  ngOnInit(): void {
    this.configService.omniwheel$.subscribe((omniwheel) => {
      this.form = this.createForm(omniwheel)
      this.hubKeys = Object.keys(omniwheel.hub)
      this.rimKeys = Object.keys(omniwheel.rim)
      this.axleKeys = Object.keys(omniwheel.axle)

      // TODO: this won't work on objects
      // Object.keys(this.form.controls).forEach((key: string) => {
      //   const control = (this.form.controls as any)[key]
      //   if (control) {
      //     const sub = control.valueChanges.subscribe((value: any) => {
      //       // TODO: send the updated values to the config service as a "temp value"
      //       // until the user clicks "save"
      //       const tempValue = {
      //         ...omniwheel,
      //         [key]: value,
      //       } as Omniwheel
      //       this.configService.updateTempConfig(tempValue)
      //     })
      //     this.subs.push(sub)
      //   }
      // })
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  /**
   * Returns a non-nullable string value for a given key. Needed for
   * setting the formControlName for unknown (at runtime) nested form array controls
   */
  getKeyName(name: unknown): string {
    if (typeof name ==='string') {
      return name
    } else {
      return ''
    }
  }

  createForm(wheelConfig: Omniwheel): FormGroup {
    const hubControl = this.formBuilder.group({
      img: wheelConfig.hub.img,
      bgColor: wheelConfig.hub.bgColor,
      textColor: wheelConfig.hub.textColor,
    })

    const rimControl = this.formBuilder.group({
      diameter: wheelConfig.rim.diameter,
      visible: wheelConfig.rim.visible,
      width: wheelConfig.rim.width,
      color: wheelConfig.rim.color,
    })

    const axleControl = this.formBuilder.group({
      rotate: wheelConfig.axle.rotate,
    })

    const nodeControls = wheelConfig.nodes.map((node) => {
      const nodeControl = this.formBuilder.group({
        id: node.id,
        name: node.name,
        tooltip: node.tooltip,
        img: node.img,
        bgColor: node.bgColor,
        textColor: node.textColor,
        rotate: node.rotate,
        height: node.height,
        width: node.width,
        text: node.text,
        curvature: node.curvature,
        action: node.action,
      })

      return nodeControl
    })

    const formGroup = this.formBuilder.group({
      hub: hubControl,
      rim: rimControl,
      axle: axleControl,
      nodes: this.formBuilder.array(nodeControls),
    })

    return formGroup
  }
}
