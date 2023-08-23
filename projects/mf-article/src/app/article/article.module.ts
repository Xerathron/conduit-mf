import { NgModule } from '@angular/core';

import { SharedModule } from 'shared';
import { ArticleCommentComponent } from './article-comment.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleResolver } from './article-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule
  ],
  declarations: [
    ArticleComponent,
    ArticleCommentComponent,
    MarkdownPipe
  ],
})
export class ArticleModule {}
