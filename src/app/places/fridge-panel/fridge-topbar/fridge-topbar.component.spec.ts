import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeTopbarComponent } from './fridge-topbar.component';

describe('FridgeTopbarComponent', () => {
  let component: FridgeTopbarComponent;
  let fixture: ComponentFixture<FridgeTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FridgeTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
