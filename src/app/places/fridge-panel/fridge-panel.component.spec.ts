import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgePanelComponent } from './fridge-panel.component';

describe('FridgePanelComponent', () => {
  let component: FridgePanelComponent;
  let fixture: ComponentFixture<FridgePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
