import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewUsersComponent } from './modal-view-users.component';

describe('ModalViewUsersComponent', () => {
  let component: ModalViewUsersComponent;
  let fixture: ComponentFixture<ModalViewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
