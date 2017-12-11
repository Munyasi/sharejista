import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {GenerateCR20Component} from './generate.component';

describe('GenerateCR6Component', () => {
  let component: GenerateCR20Component;
  let fixture: ComponentFixture<GenerateCR20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCR20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCR20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
