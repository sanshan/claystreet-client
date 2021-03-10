import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {NavbarEventsService} from '../../../app-navbar/navbar-events.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {

  @ViewChild('snav', {static: true}) sidenav: MatSidenav | undefined;

  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;
  opened$: Observable<boolean>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private navbarEvents: NavbarEventsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

    this.opened$ = this.navbarEvents.opened$;
  }

  toggle(): void {
    if (this.sidenav) {
      this.sidenav?.toggle().then(undefined);
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit(): void {
  }

}
