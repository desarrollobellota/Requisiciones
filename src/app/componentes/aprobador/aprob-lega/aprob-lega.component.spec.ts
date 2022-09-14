import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobLegaComponent } from './aprob-lega.component';

describe('AprobLegaComponent', () => {
  let component: AprobLegaComponent;
  let fixture: ComponentFixture<AprobLegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobLegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobLegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
