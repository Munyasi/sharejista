import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCR9Component } from './generate.component';

describe('GenerateCR6Component', () => {
  let component: GenerateCR9Component;
  let fixture: ComponentFixture<GenerateCR9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCR9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCR9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
