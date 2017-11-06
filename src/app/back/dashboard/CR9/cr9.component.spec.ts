import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CR8ListComponent } from './cr9.component';

describe('CR8ListComponent', () => {
  let component: CR8ListComponent;
  let fixture: ComponentFixture<CR8ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CR8ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CR8ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
