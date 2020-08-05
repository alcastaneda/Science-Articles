import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  canLoadMore: boolean;
  currentPage: number;
  itemsPerPage: number;

  constructor(public articleService: ArticleService) {
    this.canLoadMore = true;
    this.itemsPerPage = this.articleService.articles.length || 10;
    this.currentPage = this.itemsPerPage / 10;
  }

  ngOnInit(): void {
    this.fetchArticles();
  }

  /**
   * Retrieves articles and manages loadMore
   */
  fetchArticles(): void {
    let skip = this.itemsPerPage * this.currentPage;
    this.articleService
      .query({ per_page: this.itemsPerPage, offset: skip })
      .then(response => {
        this.currentPage += 1;

        // // Once the number of items returned is less than items per page it's time to stop
        if (response.length < this.itemsPerPage) {
          this.canLoadMore = false;
        }

        // Concat the response to our model list data
        this.articleService.articles = this.articleService.articles.concat(
          response.articles
        );
      })
      .catch(error => {
        this.canLoadMore = false;
        const message = error.message || 'There was an error.';
        alert(message);
      });
  }
}
