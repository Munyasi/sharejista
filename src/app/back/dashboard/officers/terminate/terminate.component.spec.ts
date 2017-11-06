import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateDirectorComponent } from './terminate.component';

describe('TerminateDirectorComponent', () => {
  let component: TerminateDirectorComponent;
  let fixture: ComponentFixture<TerminateDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminateDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminateDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
