import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SourceListComponent} from './ui/source-list/source-list.component';
import {MatListModule} from '@angular/material/list';
import {SourceComponent} from './ui/source/source.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SourceListDialogComponent} from './ui/source-list-dialog/source-list-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [SourceListComponent, SourceComponent, SourceListDialogComponent],
  exports: [
    SourceListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AppSourceListModule {
}
