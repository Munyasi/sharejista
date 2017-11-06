import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CR6ListComponent } from './cr6.component';

describe('CR8ListComponent', () => {
  let component: CR6ListComponent;
  let fixture: ComponentFixture<CR6ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CR6ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CR6ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
