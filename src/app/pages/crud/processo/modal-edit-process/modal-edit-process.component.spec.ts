import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProcessComponent } from './modal-edit-process.component';

describe('ModalEditProcessComponent', () => {
  let component: ModalEditProcessComponent;
  let fixture: ComponentFixture<ModalEditProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
