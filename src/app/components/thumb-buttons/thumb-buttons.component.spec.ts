import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbButtonsComponent } from './thumb-buttons.component';

describe('ThumbButtonsComponent', () => {
  let component: ThumbButtonsComponent;
  let fixture: ComponentFixture<ThumbButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
