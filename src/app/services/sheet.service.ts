import {Injectable} from '@angular/core';
import {SheetMeta, SheetSourceOptions} from './source-list.service';
import {SheetMetaGQL} from '../../generated/graphql';
// import {UserService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {


  constructor(
    private metaGQL: SheetMetaGQL,
    // private user: UserService
  ) {
  }

  meta(options: SheetSourceOptions): Observable<SheetMeta> {
    // const token = this.user.getToken() ?? '';
    const token = '';
    const ranges = options.range;
    const spreadsheetId = options.id;


    return this.metaGQL.fetch({token, ranges, spreadsheetId}).pipe(
      map((res) => {

        const sheet = res.data.SheetsApi?.spreadsheets?.get?.sheets
          && res.data.SheetsApi?.spreadsheets?.get?.sheets[0];

        const rows = sheet && sheet.data && sheet && sheet.data[0]?.rowData?.map((value) => {
          return value?.values?.map((v) => v?.formattedValue).filter(Boolean);
          // tslint:disable-next-line:no-non-null-assertion
        }).filter(Boolean).filter((row) => !!row![0]);

        return {
          title: res.data.SheetsApi?.spreadsheets?.get?.properties?.title ?? 'error',
          data: rows ?? [],
          size: 0
        };
      })
    );
  }

}
