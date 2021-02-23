import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SheetSource} from '../../../../services/source-list.service';

@Component({
  selector: 'app-source-list-dialog',
  templateUrl: './source-list-dialog.component.html',
  styleUrls: ['./source-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListDialogComponent {
  form: FormGroup | undefined;

  constructor(
    public dialogRef: MatDialogRef<SourceListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SheetSource | undefined
  ) {
    if (data) {

    } else {
      this.form = new FormGroup({
        id: new FormControl(Date.now() + ''),
        title: new FormControl('', [Validators.required]),
        range: new FormControl('', [Validators.required]),
        size: new FormControl(0),
        status: new FormControl('new'),
        updatedAt: new FormControl(new Date())
      });
    }


  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
