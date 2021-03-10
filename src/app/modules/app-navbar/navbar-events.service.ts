import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarEventsService {
  private openedSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  opened$: Observable<boolean> = this.openedSubj.asObservable();


  toggle(): void {
    this.openedSubj.next(!this.openedSubj.value);
  }
}
