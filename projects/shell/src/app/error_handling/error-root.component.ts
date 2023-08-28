import { Component, EventEmitter, Inject, Injector, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject, take } from 'rxjs';
import { RecoveryEvent } from '../models/error-event-model';
import { RecoveryComponent } from '../models/error-handler.model';
import { MF_ERROR_LOAD_TOKEN } from '../token/error.token';
import { RecoveryContainer } from '../models/error-routing.model';

export const EVENT_TOKEN = 'event_token'

export interface EventTokenValue {
  trigger: Subject<any>,
  recoveryEvent: EventEmitter<RecoveryEvent>
}

@Component({
  selector: 'app-error-root',
  templateUrl: './error-root.component.html',
  styleUrls: ['./error-root.component.scss'],
})
export class ErrorRootComponent implements OnInit, OnDestroy {
  public RecoveryEvent = RecoveryEvent;
  public recoveryStatus$ = new Subject<RecoveryEvent>();

  public triggerRecovery$ = new Subject<void>();

  public recovery: RecoveryContainer | any;
  public injector: Injector;

  private recoveryEvent$ = new EventEmitter<RecoveryEvent>();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.injector = this.createInjector();
    this.resolveRecoveryComponent();
  }

  /**
   * Generic cleanup
   *
   * Removes mf-error-load whenever the users moves out of
   * the /error/ page scope
   */
  ngOnDestroy(): void {
    this.storage.remove(MF_ERROR_LOAD_TOKEN);
  }

  recover() {
    this.recoveryStatus$.next(RecoveryEvent.START);
    debugger;
    this.recovery.component.recoveryService.recover().then((success) => {
      const status = success ? RecoveryEvent.SUCCESS : RecoveryEvent.FAILURE;
      this.recoveryStatus$.next(status);
    });
  }

  /**
   * Go back to the page before the error occurred
   */
  goBack() {
    this.location.back();
  }

  private resolveRecoveryComponent() {
    this.route.data.pipe(take(1)).subscribe(({ recovery }) => {
      if (recovery) {
        this.recovery = recovery;
      }
    });
  }

  private createInjector(): Injector {
    return Injector.create({
      providers: [{
        provide: EVENT_TOKEN,
        useValue: {
          trigger: this.triggerRecovery$,
          recoveryEvent: this.recoveryEvent$
        } as EventTokenValue
      }],
    })
  }
}
