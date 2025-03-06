import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFileCellRendererComponent } from './view-file-cell-renderer.component';

describe('ViewFileCellRendererComponent', () => {
  let component: ViewFileCellRendererComponent;
  let fixture: ComponentFixture<ViewFileCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFileCellRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFileCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
