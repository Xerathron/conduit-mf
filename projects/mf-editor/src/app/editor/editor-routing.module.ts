import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { AuthGuard } from 'shared';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EditableArticleResolver, AuthGuard]
})
export class EditorRoutingModule {}
