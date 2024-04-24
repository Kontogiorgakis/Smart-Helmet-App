import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeSodaComponent } from './fridge-soda.component';

describe('FridgeSodaComponent', () => {
  let component: FridgeSodaComponent;
  let fixture: ComponentFixture<FridgeSodaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeSodaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeSodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
