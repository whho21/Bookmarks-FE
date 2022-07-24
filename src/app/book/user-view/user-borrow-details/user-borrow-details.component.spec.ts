import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBorrowDetailsComponent } from './user-borrow-details.component';

describe('UserBorrowDetailsComponent', () => {
  let component: UserBorrowDetailsComponent;
  let fixture: ComponentFixture<UserBorrowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBorrowDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBorrowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
