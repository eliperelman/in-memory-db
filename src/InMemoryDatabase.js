import { Map, Stack } from 'immutable';
import {
  MissingNameError,
  MissingValueError,
  TransactionNotFoundError,
  UnknownCommandError,
} from './errors';

export default class InMemoryDatabase {
  database = Map();

  transactions = Stack();

  execute(command, name, value) {
    let transaction = this.transactions.first(this.database);

    switch (command) {
      case 'BEGIN': {
        this.transactions = this.transactions.unshift(transaction);

        return;
      }

      case 'ROLLBACK': {
        if (this.transactions.isEmpty()) {
          throw new TransactionNotFoundError();
        }

        this.transactions = this.transactions.shift();

        return;
      }

      case 'COMMIT': {
        this.database = transaction;
        this.transactions = Stack();

        return;
      }

      case 'GET': {
        if (!name) {
          throw new MissingNameError();
        }

        return transaction.get(name, 'NULL');
      }

      case 'COUNT': {
        if (!name) {
          throw new MissingValueError();
        }

        return transaction.count(value => value === name);
      }

      case 'SET': {
        if (!name) {
          throw new MissingNameError();
        } else if (!value) {
          throw new MissingValueError();
        }

        transaction = transaction.set(name, value);
        break;
      }

      case 'DELETE': {
        if (!name) {
          throw new MissingNameError();
        }

        transaction = transaction.delete(name);
        break;
      }

      default: {
        throw new UnknownCommandError(command);
      }
    }

    if (this.transactions.isEmpty()) {
      this.database = transaction;
    } else {
      this.transactions = this.transactions.withMutations(transactions => {
        transactions.shift();
        transactions.unshift(transaction);
      });
    }
  }
}
