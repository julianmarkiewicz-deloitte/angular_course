import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookPage } from './new-book-page';

describe('NewBookPage', () => {
  let component: NewBookPage;
  let fixture: ComponentFixture<NewBookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
