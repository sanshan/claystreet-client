import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {RouterModule} from '@angular/router';
import { NotFoundLayoutComponent } from './not-found-layout/not-found-layout.component';
import {AppSidenavModule} from '../modules/app-sidenav/app-sidenav.module';


@NgModule({
  declarations: [LayoutComponent, NotFoundLayoutComponent],
  exports: [
    NotFoundLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppSidenavModule
  ]
})
export class LayoutsModule {
}
