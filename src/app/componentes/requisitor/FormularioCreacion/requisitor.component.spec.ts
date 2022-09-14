import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitorComponent } from './requisitor.component';

describe('RequisitorComponent', () => {
  let component: RequisitorComponent;
  let fixture: ComponentFixture<RequisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
