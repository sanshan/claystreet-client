import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dataset-dialog',
  templateUrl: './dataset-dialog.component.html',
  styleUrls: ['./dataset-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetDialogComponent implements OnInit {
  model: any;
  fields: any;
  options: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
