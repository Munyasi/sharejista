import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCR6Component } from './generate.component';

describe('GenerateCR6Component', () => {
  let component: GenerateCR6Component;
  let fixture: ComponentFixture<GenerateCR6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCR6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCR6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
