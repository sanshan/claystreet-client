import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

type SheetSourceStatus = 'basic' | 'primary' | 'warn';

export interface SheetMeta {
  title: string;
  size?: number;
  data: unknown[];
}

export interface SheetSourceOptions {
  id: string;
  range: string;
  status?: SheetSourceStatus;
  isLoading?: boolean;
  isActive?: boolean;
  updatedAt: Date;
}

export class SheetSource implements SheetMeta, SheetSourceOptions {
  id: string;
  title: string;
  range: string;
  data: unknown[];
  size: number;
  status: SheetSourceStatus;
  isLoading: boolean;
  isActive: boolean;
  updatedAt: Date;

  constructor(options: SheetSourceOptions & Partial<SheetMeta>) {
    this.id = options.id;
    this.title = options.title ?? 'unknown';
    this.range = options.range;
    this.data = options.data ?? [];
    this.size = options.size ?? 0;
    this.status = options.status ?? 'basic';
    this.isLoading = options.isLoading ?? false;
    this.isActive = options.isActive ?? false;
    this.updatedAt = options.updatedAt ?? new Date();
  }

  needReload(): boolean {
    return this.isActive;
  }
}


@Injectable()
export class SourceListService {
  public static readonly LOCAL_STORAGE_KEY: string = 'source-list';
  // tslint:disable-next-line:max-line-length
  private sourceList$: BehaviorSubject<(SheetSourceOptions & SheetMeta)[]> = new BehaviorSubject<(SheetSourceOptions & SheetMeta)[]>(this.getFromStorage());
  stream$: Observable<(SheetSourceOptions & SheetMeta)[]> = this.sourceList$.pipe(
    tap(this.saveToStorage)
  ) as Observable<(SheetSourceOptions & SheetMeta)[]>;

  constructor() {
  }

  getFromStorage(): (SheetSourceOptions & SheetMeta)[] {
    let json: (SheetSourceOptions & SheetMeta)[];
    try {
      json = JSON.parse(localStorage.getItem(SourceListService.LOCAL_STORAGE_KEY) ?? '[]');
    } catch (e) {
      json = [];
    }

    return json;
  }

  saveToStorage(sources: SheetSourceOptions[]): void {
    localStorage.setItem(SourceListService.LOCAL_STORAGE_KEY, JSON.stringify(sources ?? []));
  }

  clearSourceList(): void {
    localStorage.removeItem(SourceListService.LOCAL_STORAGE_KEY);
  }

  add(source: (SheetSourceOptions & SheetMeta)): void {
    const newState: (SheetSourceOptions & SheetMeta)[] = [...this.sourceList$.value, source];
    this.sourceList$.next(newState);
  }

  delete(selected: (SheetSourceOptions & SheetMeta)[]): void {
    const newState: (SheetSourceOptions & SheetMeta)[] = this.sourceList$.value.filter((source) => !selected.includes(source));

    this.sourceList$.next(newState);
  }

  refresh(selected: (SheetSourceOptions & SheetMeta)[]): void {
    const indexes = selected.map(((item) => this.sourceList$.value.indexOf(item)));

    const newState = [...this.sourceList$.value];
    indexes.forEach((index) => {
      newState.splice(index, 1, {
        ...newState[index],
        isLoading: true
      });
    });

    this.sourceList$.next(newState);
  }

  complete(completed: (SheetSourceOptions & SheetMeta)[]): void {
    const indexes = completed.map(((item) => this.sourceList$.value.indexOf(item)));

    const newState = [...this.sourceList$.value];
    indexes.forEach((index) => {
      newState.splice(index, 1, {
        ...newState[index],
        isLoading: false
      });
    });

    this.sourceList$.next(newState);
  }

  active(source: (SheetSourceOptions & SheetMeta)): void {
    const newState = [...this.sourceList$.value ?? []];

    const index = newState.indexOf(source);
    const selected = newState.find((s) => s.isActive);

    if (selected) {
      console.log(selected);

      const selectedIndex = newState.indexOf(selected);
      newState.splice(selectedIndex, 1, {
        ...newState[selectedIndex],
        isActive: false
      });
    }

    newState.splice(index, 1, {
      ...newState[index],
      isActive: true
    });

    this.sourceList$.next(newState);
  }
}
