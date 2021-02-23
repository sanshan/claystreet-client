import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SheetSourceOptions} from '../../../../services/source-list.service';

@Component({
  selector: 'app-source',
  template: `
    <div *ngIf="source" class="source">
      <ng-content></ng-content>
      <div class="source-actions">
        <button (click)="load(source)" mat-icon-button aria-label="Load Data">
          <mat-icon>cloud_download</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .source {
      display: flex;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceComponent {
  @Input() source: SheetSourceOptions | undefined;
  @Output() onload: EventEmitter<SheetSourceOptions> = new EventEmitter<SheetSourceOptions>();

  load(source: SheetSourceOptions): void {
    this.onload.emit(source);
  }
}
