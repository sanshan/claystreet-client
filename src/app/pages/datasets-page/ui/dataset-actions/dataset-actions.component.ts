import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DatasetManagerService} from '../../services/dataset-manager.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DatasetDialogComponent} from '../dataset-dialog/dataset-dialog.component';

@Component({
  selector: 'app-dataset-actions',
  templateUrl: './dataset-actions.component.html',
  styleUrls: ['./dataset-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetActionsComponent implements OnInit {

  dialogSubs: Subscription = Subscription.EMPTY;

  constructor(
    private datasetManager: DatasetManagerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.dialogSubs.unsubscribe();
    this.dialogSubs = this.dialog.open(DatasetDialogComponent).afterClosed().subscribe(this.datasetManager.add);
  }


}
