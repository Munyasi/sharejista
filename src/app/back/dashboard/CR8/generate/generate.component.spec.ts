import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {GenerateCR8Component} from './generate.component';

describe('GenerateCR6Component', () => {
  let component: GenerateCR8Component;
  let fixture: ComponentFixture<GenerateCR8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCR8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCR8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
