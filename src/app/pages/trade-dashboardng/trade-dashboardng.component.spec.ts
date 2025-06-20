import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDashboardngComponent } from './trade-dashboardng.component';

describe('TradeDashboardngComponent', () => {
  let component: TradeDashboardngComponent;
  let fixture: ComponentFixture<TradeDashboardngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeDashboardngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeDashboardngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
