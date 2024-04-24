import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickenSegmentComponent } from './chicken-segment.component';

describe('ChickenSegmentComponent', () => {
  let component: ChickenSegmentComponent;
  let fixture: ComponentFixture<ChickenSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChickenSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChickenSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
