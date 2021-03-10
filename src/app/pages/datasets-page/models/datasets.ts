import {ReactiveVar} from '@apollo/client/cache/inmemory/reactiveVars';

export interface DataSetMetaData {
  [key: string]: any;
}

export interface IDataSet<TYPE = unknown> {
  id: string;
  meta: DataSetMetaData;
  data: ReactiveVar<TYPE[]>;
}

export interface DataSetOptions {
  id: string;
  meta: DataSetMetaData;
  connectionType: string;
  connectionOptions: unknown;
}

abstract class AbstractDataSet<SCHEMA> {
}

export class DataSetsFactory<SCHEMA, TYPE> {
  create(options: DataSetOptions): ClayStreetDataSet<SCHEMA, TYPE> {
    switch (options.connectionType) {
      default:
        throw new Error('unknown connection Type');
    }
  }
}

export class ClayStreetDataSet<SCHEMA, TYPE> extends AbstractDataSet<SCHEMA> implements IDataSet<TYPE> {
  id: string;
  meta: DataSetMetaData;
  data: ReactiveVar<TYPE[]>;

  constructor(options: IDataSet<TYPE>) {
    super();
    this.id = options.id;
    this.meta = options.meta;
    this.data = options.data;
  }

}
