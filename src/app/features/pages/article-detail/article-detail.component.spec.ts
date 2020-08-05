import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 6467 // represents the articleId
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls findOne on onInit', () => {
    spyOn(component, 'findOne');

    component.ngOnInit();

    expect(component.findOne).toHaveBeenCalled();
  });

  describe('findOne', () => {
    it('calls articleService.get', () => {
      spyOn(component.articleService, 'get').and.callThrough();

      component.findOne();

      expect(component.articleService.get).toHaveBeenCalled();
    });

    it('sets articleService.article', () => {
      spyOn(component.articleService, 'get').and.returnValue(
        Promise.resolve([])
      );

      component.findOne();

      expect(component.articleService.articles).toEqual([]);
    });
  });
});
