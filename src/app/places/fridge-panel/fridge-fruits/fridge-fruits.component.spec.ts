import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeFruitsComponent } from './fridge-fruits.component';

describe('FridgeFruitsComponent', () => {
  let component: FridgeFruitsComponent;
  let fixture: ComponentFixture<FridgeFruitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeFruitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
