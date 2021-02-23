import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppSheetViewComponent} from './ui/app-sheet-view/app-sheet-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [AppSheetViewComponent],
  exports: [
    AppSheetViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AppSheetViewModule {
}
