import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeLikeComponent } from './fridge-like.component';

describe('FridgeLikeComponent', () => {
  let component: FridgeLikeComponent;
  let fixture: ComponentFixture<FridgeLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
