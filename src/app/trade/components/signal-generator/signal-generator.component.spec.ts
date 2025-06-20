import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalGeneratorComponent } from './signal-generator.component';

describe('SignalGeneratorComponent', () => {
  let component: SignalGeneratorComponent;
  let fixture: ComponentFixture<SignalGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
