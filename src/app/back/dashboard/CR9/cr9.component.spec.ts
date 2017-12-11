import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CR9ListComponent} from './cr9.component';

describe('CR8ListComponent', () => {
  let component: CR9ListComponent;
  let fixture: ComponentFixture<CR9ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CR9ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CR9ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
