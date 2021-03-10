import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {of, Observable, from} from 'rxjs';
import {Card} from '../ui/datasets-list/ui/card/card.component';
import {ClayStreetDataSet} from '../models/datasets';
import {GET_CURRENT_DATASET} from '../gql/local';
import {filter, map, switchMap, tap, toArray} from 'rxjs/operators';


@Injectable()
export class DataSetResolver implements Resolve<Observable<any>> {


  constructor(private apollo: Apollo) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {

    const current$: Observable<Card> = this.apollo.watchQuery<{ current: Card }>({
      query: GET_CURRENT_DATASET,
    }).valueChanges.pipe(
      tap(console.log),
      map((res) => res?.data?.current),
      filter(a => !!a),
      switchMap((current) => of(current))
    );

    console.log('DataSetResolver');
    return of(current$);
  }


}
