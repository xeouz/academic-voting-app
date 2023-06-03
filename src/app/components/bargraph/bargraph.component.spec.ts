import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BargraphComponent } from './bargraph.component';

describe('BargraphComponent', () => {
  let component: BargraphComponent;
  let fixture: ComponentFixture<BargraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BargraphComponent]
    });
    fixture = TestBed.createComponent(BargraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
