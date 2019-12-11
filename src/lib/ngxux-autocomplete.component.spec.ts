import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxuxAutocompleteComponent } from './ngxux-autocomplete.component';

describe('NgxuxAutocompleteComponent', () => {
  let component: NgxuxAutocompleteComponent;
  let fixture: ComponentFixture<NgxuxAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxuxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxuxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
