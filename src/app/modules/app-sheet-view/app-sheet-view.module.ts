import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppSheetViewComponent} from './ui/app-sheet-view/app-sheet-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {DataSetResolver} from '../../pages/datasets-page/resolvers/dataset-resolver.service';
import {SourceListService} from '../../services/source-list.service';

const routes: Routes = [
  {
    path: '',
    component: AppSheetViewComponent,
    resolve: {
      dataset: DataSetResolver
    }
  },
];

@NgModule({
  declarations: [AppSheetViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    SourceListService,
    DataSetResolver
  ]
})
export class AppSheetViewModule {
}
