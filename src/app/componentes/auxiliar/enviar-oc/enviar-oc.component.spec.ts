import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarOCComponent } from './enviar-oc.component';

describe('EnviarOCComponent', () => {
  let component: EnviarOCComponent;
  let fixture: ComponentFixture<EnviarOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarOCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
