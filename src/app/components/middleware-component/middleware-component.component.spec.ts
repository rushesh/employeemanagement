import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareComponentComponent } from './middleware-component.component';

describe('MiddlewareComponentComponent', () => {
  let component: MiddlewareComponentComponent;
  let fixture: ComponentFixture<MiddlewareComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlewareComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlewareComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
