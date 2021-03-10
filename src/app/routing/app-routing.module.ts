import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {DatasetResolver} from '../modules/app-source-list/resolvers/dataset-resolver.service';


const routes: Routes = [
  // {
  //   path: 'datasets',
  //   component: AppLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'sidenav',
  //       loadChildren: () => import('../modules/app-source-list/app-source-list.module').then(m => m.AppSourceListModule)
  //     },
  //     {
  //       path: 'test',
  //       outlet: 'sidenav-content',
  //       loadChildren: () => import('../modules/app-sheet-view/app-sheet-view.module').then(m => m.AppSheetViewModule),
  //       resolve: {
  //         sources: DatasetResolver
  //       }
  //     },
  //   ]
  // },
  {
    path: 'home',
    loadChildren: () => import('../pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'datasets',
    loadChildren: () => import('../pages/datasets-page/datasets-page.module').then(m => m.DatasetsPageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '**',
    loadChildren: () => import('../system-modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
