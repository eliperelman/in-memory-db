export class MissingNameError extends Error {
  name = 'MissingNameError';

  constructor() {
    super('MISSING REQUIRED NAME');
  }
}

export class MissingValueError extends Error {
  name = 'MissingValueError';

  constructor() {
    super('MISSING REQUIRED VALUE');
  }
}

export class TransactionNotFoundError extends Error {
  name = 'TransactionNotFoundError';

  constructor() {
    super('TRANSACTION NOT FOUND');
  }
}

export class UnknownCommandError extends Error {
  name = 'UnknownCommandError';

  constructor(command) {
    super(`UNKNOWN COMMAND: '${command}'`);
  }
}
