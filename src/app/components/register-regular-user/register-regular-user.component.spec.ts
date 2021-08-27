import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRegularUserComponent } from './register-regular-user.component';

describe('RegisterRegularUserComponent', () => {
  let component: RegisterRegularUserComponent;
  let fixture: ComponentFixture<RegisterRegularUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRegularUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRegularUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
