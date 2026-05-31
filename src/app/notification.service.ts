import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications$ = new Subject<string>();

  constructor() {
    this.notifications$.pipe(takeUntilDestroyed()).subscribe((message) => alert(message));
  }

  notify(message: string) {
    this.notifications$.next(message);
  }
}
