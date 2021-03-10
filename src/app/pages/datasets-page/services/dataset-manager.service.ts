import {Injectable} from '@angular/core';
import {DataSetOptions} from '../models/datasets';
import {dataSetsVar, selectedCardVar} from '../cache/datasets';
import {Card} from '../ui/datasets-list/ui/card/card.component';

@Injectable()
export class DatasetManagerService {

  constructor() {
  }

  add(options: DataSetOptions): void {

    const card: DataSetOptions = {
      id: 'string',
      meta: {},
      connectionType: 'string',
      connectionOptions: 'unknown',
    };

    dataSetsVar([...dataSetsVar(), card]);
    localStorage.setItem('datasets', JSON.stringify(dataSetsVar()));
  }

  select(card: Card): void {
    selectedCardVar(card);
  }
}
