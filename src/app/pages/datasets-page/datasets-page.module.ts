import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../../layouts/layout/layout.component';
import {DatasetActionsComponent} from './ui/dataset-actions/dataset-actions.component';
import {DatasetManagerService} from './services/dataset-manager.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DatasetDialogComponent} from './ui/dataset-dialog/dataset-dialog.component';
import {FormlyModule} from '@ngx-formly/core';
import {MatDialogModule} from '@angular/material/dialog';
import {AppCardListModule} from './ui/datasets-list/app-card-list.module';
import {CardListComponent} from './ui/datasets-list/ui/card-list/card-list.component';
import {CardsResolver} from './resolvers/cards-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        outlet: 'app-navbar',
        loadChildren: () => import('../../modules/app-navbar/app-navbar.module').then(m => m.AppNavbarModule)
      },
      {
        path: '',
        outlet: 'app-sidenav-actions',
        component: DatasetActionsComponent
      },
      {
        path: '',
        outlet: 'app-sidenav',
        component: CardListComponent,
        resolve: {
          cards: CardsResolver
        }
      },
      {
        path: '',
        outlet: 'app-sidenav-content',
        loadChildren: () => import('../../modules/app-sheet-view/app-sheet-view.module').then(m => m.AppSheetViewModule)
      },
    ]
  }
];

@NgModule({
  declarations: [DatasetActionsComponent, DatasetDialogComponent],
  imports: [
    CommonModule,
    AppCardListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormlyModule.forRoot({extras: {lazyRender: true}}),
    RouterModule.forChild(routes),
  ],
  providers: [DatasetManagerService, CardsResolver]
})
export class DatasetsPageModule {
}
