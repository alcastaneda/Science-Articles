import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../types/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article: any;
  articles: Article[] = [];
  pages: number = 0;
  constructor(private http: HttpClient) {}

  query(params: {}): Promise<any> {
    let queryUrl = `https://submissions.scholasticahq.com/api/v1/articles.json?`;

    let serializedParams = new URLSearchParams();
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        serializedParams.set(key, params[key]);
      }
    }

    queryUrl += serializedParams.toString();

    return this.http
      .get(queryUrl, { responseType: 'json' })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  /**
   * Retrieves a single object via API
   * @param  {String} id  The id for the object to be retrieved
   * @return {Promise}    The $http request
   */
  get(id: string): Promise<any> {
    // If object exists in this.articles, use that article
    let index = this.articles.findIndex(o => o.id.toString() === id);
    if (index > -1) {
      this.article = this.articles[index];
      return new Promise((resolve, reject) => {
        resolve(this.article);
      });
    } else {
      let queryUrl = `https://submissions.scholasticahq.com/api/v1/articles/${id}.json`;
      return this.http
        .get(queryUrl, { responseType: 'json' })
        .toPromise()
        .then(response => {
          this.article = response;
          return response;
        });
    }
  }
}
