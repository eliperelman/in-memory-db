# @eliperelman/in-memory-db

`@eliperelman/in-memory-db` is a tiny demo Node.js CLI app demonstrating
a running in-memory database backed by Immutable.js.

## Requirements

- Node.js 12+
- npm v5.4+

## Usage

`@eliperelman/in-memory-db` can be consumed directly from the terminal
via `npx`:


```bash
npx @eliperelman/in-memory-db
```

This will launch you directly into a database session prompt:

```bash
>> 
```

You can use the following functions to interact with the database:

```bash
# Sets the name in the database to the given value.
SET [name] [value]

# Prints the value for the given name.
# If the value is not in the database, prints N​ULL.
GET [name]

# Deletes the value from the database.
DELETE [name]

# Returns the number of names that have the given value assigned to them.
# If that value is not assigned anywhere, prints 0​.
COUNT [value]

# Exits the database.
END
```

The in-memory database also supports transactions via `BEGIN`, `ROLLBACK`, and `COMMIT`:

```bash
# Begins a new transaction.
BEGIN

# Rolls back the most recent transaction.
ROLLBACK

# Commits ​all​ of the open transactions.
COMMIT
```
