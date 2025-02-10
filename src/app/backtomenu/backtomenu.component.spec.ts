import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktomenuComponent } from './backtomenu.component';

describe('BacktomenuComponent', () => {
  let component: BacktomenuComponent;
  let fixture: ComponentFixture<BacktomenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacktomenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktomenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
