import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererVisiteurComponent } from './gerer-visiteur.component';

describe('GererVisiteurComponent', () => {
  let component: GererVisiteurComponent;
  let fixture: ComponentFixture<GererVisiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererVisiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
