import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {SheetSource, SheetSourceOptions, SourceListService} from '../../../../services/source-list.service';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-sheet-view',
  templateUrl: './app-sheet-view.component.html',
  styleUrls: ['./app-sheet-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSheetViewComponent implements OnInit {
  source$: Observable<SheetSourceOptions> | undefined;

  constructor(
    private sources: SourceListService
  ) {
  }

  ngOnInit(): void {
    this.source$ = this.catchActiveSource();
  }

  private catchActiveSource(): Observable<SheetSourceOptions> {
    return this.sources.stream$.pipe(
      switchMap((sources) => from(sources)),
      filter(this.catch)
    );
  }

  private catch(options: SheetSourceOptions): boolean {
    try {
      return new SheetSource(options).needReload();
    } catch (e) {
      console.warn(e);
      return false;
    }

  }
}
