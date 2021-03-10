import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Card} from '../card/card.component';
import {Observable} from 'rxjs';
import {DatasetManagerService} from '../../../../services/dataset-manager.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {
  cards$: Observable<Card[]> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasetManager: DatasetManagerService,
  ) {
  }

  ngOnInit(): void {
    this.cards$ = this.activatedRoute.snapshot.data?.cards;
  }

  select(card: Card): void {
    this.datasetManager.select(card);
  }
}

