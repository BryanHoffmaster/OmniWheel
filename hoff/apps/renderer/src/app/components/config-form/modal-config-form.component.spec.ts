import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ModalConfigFormComponent } from './modal-config-form.component'

describe('ModalConfigFormComponent', () => {
  let component: ModalConfigFormComponent
  let fixture: ComponentFixture<ModalConfigFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfigFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ModalConfigFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
