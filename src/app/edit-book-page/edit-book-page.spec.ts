import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookPage } from './edit-book-page';

describe('EditBookPage', () => {
  let component: EditBookPage;
  let fixture: ComponentFixture<EditBookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
