import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalAnalysisComponent } from './signal-analysis.component';

describe('SignalAnalysisComponent', () => {
  let component: SignalAnalysisComponent;
  let fixture: ComponentFixture<SignalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
