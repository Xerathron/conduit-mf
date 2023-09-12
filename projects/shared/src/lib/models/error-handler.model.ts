
export interface ErrorHandlingComponent {
}

export interface RecoveryComponent {
  recoveryService: RecoveryService;
}

/**
 * Indicates that the service handles a error by
 * providing a recover method.
 */
export interface RecoveryService {
  /**
   * Tries to recover from the error.
   *
   * @returns a Promise containing a bool
   * about the success
   */
  recover(): Promise<boolean>;
}
