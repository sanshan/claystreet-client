import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

type SheetSourceStatus = 'basic' | 'primary' | 'warn';

export interface SheetSourceOptions {
  id?: string;
  title: string;
  range: string;
  size?: number;
  status?: SheetSourceStatus;
  isLoading?: boolean;
  isActive?: boolean;
  updatedAt?: Date | null;
}

export class SheetSource {
  id: string;
  title: string;
  range: string;
  size: number;
  status: SheetSourceStatus;
  isLoading: boolean;
  isActive: boolean;
  updatedAt: Date | null;

  constructor(options: SheetSourceOptions) {
    this.id = options?.id ?? Date.now() + '';
    this.title = options.title;
    this.range = options.range;
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


@Injectable({
  providedIn: 'root'
})
export class SourceListService {
  public static readonly LOCAL_STORAGE_KEY: string = 'source-list';
  private sourceList$: BehaviorSubject<SheetSourceOptions[]> = new BehaviorSubject<SheetSourceOptions[]>(this.getFromStorage());
  stream$: Observable<SheetSourceOptions[]> = this.sourceList$.pipe(
    tap(this.saveToStorage)
  ) as Observable<SheetSourceOptions[]>;

  constructor() {
  }

  getFromStorage(): SheetSourceOptions[] {
    let json: SheetSourceOptions[];
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

  add(source: SheetSourceOptions): void {
    const newState: SheetSourceOptions[] = [...this.sourceList$.value, source];
    this.sourceList$.next(newState);
  }

  delete(selected: SheetSourceOptions[]): void {
    const newState: SheetSourceOptions[] = this.sourceList$.value.filter((source) => !selected.includes(source));

    this.sourceList$.next(newState);
  }

  refresh(selected: SheetSourceOptions[]): void {
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

  active(source: SheetSourceOptions): void {
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
