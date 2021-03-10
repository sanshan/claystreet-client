import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutsModule} from '../../layouts/layouts.module';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutsModule,
  ]
})
export class NotFoundModule {
}
