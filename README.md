# Schema

[![npm](https://img.shields.io/npm/v/@tselect/schema.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/schema)
 [![npm](https://img.shields.io/npm/dm/@tselect/schema.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/schema)
[![npm](https://img.shields.io/npm/l/@tselect/schema.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/schema)

Typed, composable JSON schemas. This module consumes and produces JSON schemas with little to no processing.

## Installation

`npm i @tselect/schema [--save]`

## Disclaimer

This module takes the following positions:
- `additionalProperties` for `object` schemas is `false` unless you specify a value
- `additionalItems` for `array` schemas is `false` unless you specify a value

## Motivation

Writing JSON schemas for large applications can be pretty time consuming. Having to type double quotes and "additionalProperties" for each new object by hand is no fun.

This module has been created with the intention of reducing the overhead of describing JSON by providing simple wrappers and utilities to manage common use cases with easiness.

It is also fully typed and will allow you to benefit from your favorite IDE's auto-completion, making typing a lot easier.

## Usage

### Building a schema

```typescript
import { object, email } from '@tselect/schema';

const schema = object({
  foo: email()
});
```

Produces:

```javascript
schema = {
  type: 'object',
  additionalProperties: false, // Default, see disclaimer
  properties: {
    foo: {
      type: 'string',
      format: 'email'
    }
  }
}
```


### Manipulating a schema

```typescript
import { object, email, integer, omitProperties } from '@tselect/schema';

const schema = object({
  foo: email(),
  bar: integer()
}, {
  required: ['foo', 'bar']
});

const modified = omitProperties(schema, ['bar']);
```

Produces:

```javascript
modified = {
 type: 'object',
 required: ['foo'], // Only foo is kept as required
 additionalProperties: false, // Default, see disclaimer
 properties: {
   foo: { // No bar property anymore
     type: 'string',
     format: 'email'
   }
 }
}
```

### Nullable types

```typescript
import { string } from '@tselect/schema';

const schema = string({ nullable: true });
```

Produces:
```javascript
schema = {
  type: ['string', 'null']
}
```

### JSON schema compatibility

Any JSON schema you already wrote can be manipulated using this module.

```typescript
import { object } from '@tselect/schema';

const schema = object({}, {
  type: 'object',
  required: ['foo'],
  additionalProperties: true,
  properties: {
    foo: {
      type: 'string',
      format: 'email'
    }
  }
}) 
```

Produces the exact same schema :

```javascript
schema = {
  type: 'object',
  required: ['foo'],
  additionalProperties: true,
  properties: {
    foo: {
      type: 'string',
      format: 'email'
    }
  } 
};
```
