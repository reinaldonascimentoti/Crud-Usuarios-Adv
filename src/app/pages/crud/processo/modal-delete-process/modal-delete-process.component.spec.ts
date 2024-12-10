import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteProcessComponent } from './modal-delete-process.component';

describe('ModalDeleteProcessComponent', () => {
  let component: ModalDeleteProcessComponent;
  let fixture: ComponentFixture<ModalDeleteProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
