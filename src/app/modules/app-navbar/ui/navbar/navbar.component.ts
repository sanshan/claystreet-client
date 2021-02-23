import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.user.isLoggedIn();
  }

  constructor(private user: UserService
  ) {
  }

  ngOnInit(): void {
  }

  public signIn(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.user.signIn();
  }

}
