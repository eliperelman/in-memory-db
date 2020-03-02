import { terminal } from 'terminal-kit';
import { Subject } from 'rxjs';

export default class Terminal {
  commands$ = new Subject();

  log(message) {
    terminal(message === undefined ? '\n' : `\n${message}\n`);
    this.shell();
  }

  error(err) {
    terminal.red.bold(`\n${typeof err === 'string' ? err : err.message}\n`);
    this.shell();
  }

  async shell() {
    terminal('>> ');

    const input = await terminal.inputField().promise;
    const [raw, ...args] = input.split(' ');

    this.commands$.next({ command: raw.toUpperCase(), args });
  }

  render() {
    terminal.on('key', key => {
      if (key === 'CTRL_C') {
        this.exit();
      }
    });

    this.shell();
  }

  exit() {
    process.exit(0);
  }
}
