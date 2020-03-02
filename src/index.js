import InMemoryDatabase from './InMemoryDatabase';
import Terminal from './Terminal';

const terminal = new Terminal();
const db = new InMemoryDatabase();

terminal.commands$.subscribe(({ command, args }) => {
  if (command === 'END') {
    terminal.exit();
  }

  try {
    terminal.log(db.execute(command, ...args));
  } catch (err) {
    terminal.error(err);
  }
});

terminal.render();
