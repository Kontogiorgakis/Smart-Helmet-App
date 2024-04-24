import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeMeatsComponent } from './fridge-meats.component';

describe('FridgeMeatsComponent', () => {
  let component: FridgeMeatsComponent;
  let fixture: ComponentFixture<FridgeMeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeMeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeMeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
