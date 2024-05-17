import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OmniwheelComponent } from './omniwheel.component';

describe('OmniwheelComponent', () => {
  let component: OmniwheelComponent;
  let fixture: ComponentFixture<OmniwheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniwheelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OmniwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
