import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellTesterComponent } from './shell-tester.component';

describe('ShellTesterComponent', () => {
  let component: ShellTesterComponent;
  let fixture: ComponentFixture<ShellTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellTesterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
