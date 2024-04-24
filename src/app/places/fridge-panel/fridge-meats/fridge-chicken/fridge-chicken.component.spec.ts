import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeChickenComponent } from './fridge-chicken.component';

describe('FridgeChickenComponent', () => {
  let component: FridgeChickenComponent;
  let fixture: ComponentFixture<FridgeChickenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeChickenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeChickenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
