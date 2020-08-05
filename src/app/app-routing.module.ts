import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './features/pages/article-detail/article-detail.component';
import { ArticleListComponent } from './features/pages/article-list/article-list.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
