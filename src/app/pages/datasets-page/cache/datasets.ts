import {InMemoryCache, makeVar} from '@apollo/client/core';
import {DataSetOptions} from '../models/datasets';
import {Card} from '../ui/datasets-list/ui/card/card.component';

const initialDataSets: DataSetOptions[] = JSON.parse(localStorage.getItem('datasets') ?? '[]');

export const dataSetsVar = makeVar<DataSetOptions[]>(initialDataSets);
export const selectedCardVar = makeVar<Card | null>(null);


export const DATASETS_CASH = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        datasets: {
          // tslint:disable-next-line:typedef
          read() {
            return dataSetsVar();
          },
        },
        current: {
          // tslint:disable-next-line:typedef
          read() {
            return selectedCardVar();
          },
        },
      },
    },
  },
});
