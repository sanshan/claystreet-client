import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {GET_DATASETS} from '../gql/local';
import {Card} from '../ui/datasets-list/ui/card/card.component';
import {filter, map, switchMap, toArray} from 'rxjs/operators';
import {of, Observable, from} from 'rxjs';
import {DataSetOptions} from '../models/datasets';


@Injectable()
export class CardsResolver implements Resolve<Observable<Card[]>> {

  static BUILD_CARD_FROM_DATASET(options: DataSetOptions): Card {
    return new Card({
      id: options.id,
      title: 'getTitle()',
      type: 'getType()',
    });
  }

  constructor(private apollo: Apollo) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Observable<Card[]>> | Promise<Observable<Card[]>> | Observable<Card[]> {
    const datasets$: Observable<Card[]> = this.apollo.watchQuery<{ datasets: DataSetOptions[] }>({
      query: GET_DATASETS,
    }).valueChanges.pipe(
      map((res) => res?.data?.datasets),
      filter(a => !!a),
      switchMap((datasets) => from(datasets).pipe(
        map(CardsResolver.BUILD_CARD_FROM_DATASET), toArray(),
      ))
    );

    return of(datasets$);
  }


}
