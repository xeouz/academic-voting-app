import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDataPageComponent } from './auth-data-page.component';

describe('AuthDataPageComponent', () => {
  let component: AuthDataPageComponent;
  let fixture: ComponentFixture<AuthDataPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDataPageComponent]
    });
    fixture = TestBed.createComponent(AuthDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
