import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeTropicalComponent } from './fridge-tropical.component';

describe('FridgeTropicalComponent', () => {
  let component: FridgeTropicalComponent;
  let fixture: ComponentFixture<FridgeTropicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeTropicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeTropicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
