import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewProcessComponent } from './modal-view-process.component';

describe('ModalViewProcessComponent', () => {
  let component: ModalViewProcessComponent;
  let fixture: ComponentFixture<ModalViewProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
