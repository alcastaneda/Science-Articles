import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../../services/article.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListComponent],
      imports: [HttpClientModule],
      providers: [ArticleService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls fetchArticles on onInit', () => {
    spyOn(component, 'fetchArticles');

    component.ngOnInit();

    expect(component.fetchArticles).toHaveBeenCalled();
  });

  describe('fetchArticles', () => {
    it('calls articleService.query', () => {
      spyOn(component.articleService, 'query').and.callThrough();

      component.fetchArticles();

      expect(component.articleService.query).toHaveBeenCalled();
    });

    it('sets articleService.articles', () => {
      spyOn(component.articleService, 'query').and.returnValue(
        Promise.resolve([])
      );

      component.fetchArticles();

      expect(component.articleService.articles).toEqual([]);
    });

    // TO DO: fix test - The test bellow is not working:(

    it('shows an alert if error', done => {
      const message = 'test error message';
      spyOn(component.articleService, 'query').and.returnValue(
        Promise.reject()
      );
      spyOn(window, 'alert');

      component.fetchArticles();

      expect(window.alert).toHaveBeenCalledWith(message);
      done();
    });
  });
});
