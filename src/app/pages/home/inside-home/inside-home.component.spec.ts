import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideHomeComponent } from './inside-home.component';

describe('InsideHomeComponent', () => {
  let component: InsideHomeComponent;
  let fixture: ComponentFixture<InsideHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsideHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
