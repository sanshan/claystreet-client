import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavbarEventsService} from '../../navbar-events.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  constructor(
    private events: NavbarEventsService
  ) {
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.events.toggle();
  }
}
