# Schematic

Types, programmatic JSON schemas.

## Requirements

- `node >= 7.10`
- `typescript >= 2.4`

## Installation

`npm i @bluejay/schematic [--save]`

## Usage

```typescript
import { object, string } from '@bluejay/schematic';

const schema = object({
  foo: string()
});

schema.validate({ foo: true }, { required: ['foo'] }).then(result => {
  result.isValid(); // false
  result.errors; // [...]
});
```

## Documentation
