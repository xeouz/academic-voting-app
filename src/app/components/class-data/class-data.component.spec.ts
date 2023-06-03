import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDataComponent } from './class-data.component';

describe('ClassDataComponent', () => {
  let component: ClassDataComponent;
  let fixture: ComponentFixture<ClassDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDataComponent]
    });
    fixture = TestBed.createComponent(ClassDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
