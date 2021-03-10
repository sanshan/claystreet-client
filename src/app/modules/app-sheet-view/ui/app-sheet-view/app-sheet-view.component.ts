import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
// import {SheetDataGQL} from '../../../../../generated/graphql';

// import {UserService} from '../../../../services/auth.service';

@Component({
  selector: 'app-sheet-view',
  templateUrl: './app-sheet-view.component.html',
  styleUrls: ['./app-sheet-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSheetViewComponent implements OnInit {
  source$: Observable<any> | undefined;

  private testSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private sources: SourceListService,
    // private sheet: SheetDataGQL,
    // private user: UserService
  ) {
  }

  ngOnInit(): void {
    // this.source$ = this.catchActiveSource();
    this.activatedRoute.snapshot.data.dataset.subscribe((data: any) => {
      console.log('AppSheetViewComponent', data);
    });

  }

  // private catchActiveSource(): Observable<SheetSourceOptions & SheetMeta> {
  //   return this.sources.stream$.pipe(
  //     switchMap((sources) => from(sources)),
  //     filter(this.catch),
  //     // tap(this.initDataSource)
  //   );
  // }

  // private initDataSource = (options: (SheetSourceOptions & SheetMeta)): void => {
  //   if (this.testSub) {
  //     this.testSub.unsubscribe();
  //   }
  //
  //   // const token = this.user.getToken() ?? '';
  //   const token = '';
  //   const ranges = options.range;
  //   const spreadsheetId = options.id;
  //
  //   this.testSub = this.sheet.watch({
  //     token, ranges, spreadsheetId
  //   }).valueChanges.subscribe((resp) => {
  //     console.log(resp);
  //
  //     this.sources.complete([options]);
  //   });
  //
  // }

  // private catch(options: (SheetSourceOptions & SheetMeta)): boolean {
  //   try {
  //     return new SheetSource(options).needReload();
  //   } catch (e) {
  //     console.warn(e);
  //     return false;
  //   }
  //
  // }
}
