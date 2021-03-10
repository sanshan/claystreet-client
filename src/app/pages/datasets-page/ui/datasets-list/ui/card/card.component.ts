import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

export interface ICard {
  id: string;
  title: string;
  status: 'success' | 'warning' | 'danger';
  type: string;
  date: number;
  isLoading: boolean;
}

export class Card implements ICard {
  id: string;
  title: string;
  status: 'success' | 'warning' | 'danger';
  type: string;
  date: number;
  isLoading: boolean;

  constructor(options: Partial<Pick<ICard, Exclude<keyof ICard, 'id' | 'title'>>> & Pick<ICard, 'title' | 'id'>) {
    this.id = options.id;
    this.title = options.title;
    this.status = options.status ?? 'warning';
    this.type = options.type ?? 'error!';
    this.date = options.date ?? Date.now();
    this.isLoading = options.isLoading ?? false;

  }
}

@Component({
  selector: 'app-list-card',
  template: `
    <ng-container *ngIf="is(card) as item">

      <mat-card class="card" (click)="onClick(item)">
        <mat-card-title class="title">{{item.title}}</mat-card-title>
        <mat-card-content class="content">
          <ng-container *ngIf="!item.isLoading;else unset">
            <div class="content-row">
              <span class="row-key">тип:</span> <span class="row-value">{{item.type}} </span>
            </div>
            <div class="content-row">
              <span class="row-key">дата:</span> <span class="row-value">{{toDate(item.date)}}</span>
            </div>
            <div class="content-row">
              <span class="row-key">статус:</span> <span [ngClass]="item.status">{{item.status}}</span>
            </div>
          </ng-container>
          <ng-template #unset>
            <div class="flex-container">
              <mat-spinner [diameter]="80"></mat-spinner>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>

    </ng-container>
  `,
  styleUrls: ['card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card: Card | undefined;
  @Output() oncardclick: EventEmitter<Card> = new EventEmitter<Card>();

  onClick(item: Card): void {
    this.oncardclick.emit(item);
  }

  toDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }

  is(val: any): Card | false {
    return val instanceof Card ? val : false;
  }
}
