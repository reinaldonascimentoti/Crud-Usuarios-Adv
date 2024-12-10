import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormProcessoComponent } from './modal-form-process.component';

describe('ModalFormProcessComponent', () => {
  let component: ModalFormProcessoComponent;
  let fixture: ComponentFixture<ModalFormProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormProcessoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFormProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
