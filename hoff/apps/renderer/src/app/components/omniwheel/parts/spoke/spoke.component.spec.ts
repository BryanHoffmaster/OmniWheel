import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpokeComponent } from './spoke.component';

describe('SpokeComponent', () => {
  let component: SpokeComponent;
  let fixture: ComponentFixture<SpokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpokeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
