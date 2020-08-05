import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../types/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  constructor(
    public route: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.findOne();
  }

  /**
   * Retrieves one article and sets this.article
   */
  findOne(): void {
    let articleId = this.route.snapshot.paramMap.get('id');
    this.articleService
      .get(articleId)
      .then(response => {
        this.article = response;
      })
      .catch(error => {
        alert(error.message);
      });
  }
}
