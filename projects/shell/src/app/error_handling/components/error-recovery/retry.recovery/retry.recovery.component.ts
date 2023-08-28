import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RecoveryEvent } from 'projects/shell/src/app/models/error-event-model';
import { RetryRecoveryService } from 'projects/shell/src/app/services/retry-recovery.service';
import { Subscription, Subject, timer, take, map, takeUntil } from 'rxjs';
import { EVENT_TOKEN, EventTokenValue } from '../../../error-root.component';
import { RecoveryComponent } from 'projects/shell/src/app/models/error-handler.model';

/**
 * Reconnection time in milliseconds
 */
const INIT_RECONNECTION_TIME = 7000;

/**
 * Every time trying reloading the page fails
 * the factor is getting added to the total waiting time
 */
const INCREASE_TIME_FACTOR = 2.0;

/**
 * Maximum time threshold in milliseconds
 */
const MAX_TIME = 30000;

@Component({
  selector: 'app-retry.recovery',
  templateUrl: './retry.recovery.component.html',
  styleUrls: ['./retry.recovery.component.scss']
})
export class RetryRecoveryComponent implements OnInit, OnDestroy, RecoveryComponent {
  private reconnectionTime = INIT_RECONNECTION_TIME;
  private countdown = INIT_RECONNECTION_TIME;
  private timer$: Subscription;
  private destroy$ = new Subject<void>();

  public eventStatus: RecoveryEvent;
  public recoveryEvent = RecoveryEvent;

  constructor(
    public recoveryService: RetryRecoveryService,
    @Inject(EVENT_TOKEN) public events: EventTokenValue
  ) {}

  ngOnInit(): void {
    this.newTimer();
    this.setEventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates a new Timer that counts from reconnectionTime
   * down to zero. It emits every 0.1 second to the countdown var
   *
   * The reconnectionTime value increases every time {@link reloadPage} fails
   */
  private newTimer() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }

    this.countdown = this.reconnectionTime;

    const interval = 100; // in ms
    this.timer$ = timer(1, interval)
      .pipe(take(this.reconnectionTime / interval + 1))
      .pipe(map((n) => this.reconnectionTime - n * interval))
      .subscribe({
        next: (i) => (this.countdown = i),
        complete: () => this.solve(),
      });
  }

  private setEventListener() {
    this.events.recoveryEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: RecoveryEvent) => {
        this.eventStatus = event;

        switch (event) {
          case RecoveryEvent.START:
            // manually stop timer
            this.timer$.unsubscribe();
            break;

          case RecoveryEvent.FAILURE:
            this.reconnectionTime = this.getNextTime();
            this.newTimer();
            break;
        }
      });

    this.events.trigger.subscribe(async () => {
      this.events.recoveryEvent.emit(RecoveryEvent.START);
      const success = await this.recoveryService.recover();
      const recoveryEvent = success
        ? RecoveryEvent.SUCCESS
        : RecoveryEvent.FAILURE;
      this.events.recoveryEvent.emit(recoveryEvent);
    });
  }

  /**
   * Try reloading error causing page
   *
   * If the error remains increase the reconnection time and
   * reset the timer
   */
  private async solve() {
    this.events.trigger.next(null);
  }

  /********************************
   *        Computed values
   ********************************/
  get percentageProgress(): number {
    return (
      ((this.reconnectionTime - this.countdown) / this.reconnectionTime) * 100
    );
  }

  /**
   * Returns the countdown time in seconds
   */
  get countdownTime(): number {
    return Math.trunc(this.countdown / 1000) + 1;
  }

  private getNextTime(): number {
    return Math.min(this.reconnectionTime * INCREASE_TIME_FACTOR, MAX_TIME);
  }

}
