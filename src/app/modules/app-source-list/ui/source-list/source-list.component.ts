import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SheetSourceOptions, SourceListService} from '../../../../services/source-list.service';
import {MatDialog} from '@angular/material/dialog';
import {SourceListDialogComponent} from '../source-list-dialog/source-list-dialog.component';
import {filter} from 'rxjs/operators';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent implements OnInit, OnDestroy {
  @ViewChild('selectionList', {static: true}) selectionList: MatSelectionList | undefined;
  sources$: Observable<SheetSourceOptions[]> | undefined;
  private dialogSubscription: Subscription | undefined;

  constructor(
    private list: SourceListService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.sources$ = this.list.stream$;
  }

  addOne(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }

    // tslint:disable-next-line:max-line-length
    this.dialogSubscription = this.dialog.open<SourceListDialogComponent, any, SheetSourceOptions>(SourceListDialogComponent).afterClosed().pipe(
      filter(a => !!a)
    ).subscribe((result) => {
      // tslint:disable-next-line:no-non-null-assertion
      this.list.add(result!);
    });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  delete(selectedOptions: SelectionModel<MatListOption>): void {
    if (selectedOptions.selected) {
      const selected: SheetSourceOptions[] = selectedOptions.selected.map(({value}) => value);
      this.list.delete(selected);
      this.selectionList?.deselectAll();
    }
  }

  refresh(selectedOptions: SelectionModel<MatListOption>): void {
    if (selectedOptions.selected) {
      const selected: SheetSourceOptions[] = selectedOptions.selected.map(({value}) => value);
      this.list.refresh(selected);
      this.selectionList?.deselectAll();
    }
  }

  load(source: SheetSourceOptions): void {
    this.list.active(source);
  }
}

