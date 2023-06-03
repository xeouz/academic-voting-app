import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSelectButtonComponent } from './vote-select-button.component';

describe('VoteSelectButtonComponent', () => {
  let component: VoteSelectButtonComponent;
  let fixture: ComponentFixture<VoteSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSelectButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
