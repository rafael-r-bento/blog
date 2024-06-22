import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JSInfoComponent } from './js-info.component';

describe('JSInfoComponent', () => {
  let component: JSInfoComponent;
  let fixture: ComponentFixture<JSInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JSInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JSInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
