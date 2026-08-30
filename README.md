# @tselect/schema

[![npm](https://img.shields.io/npm/v/@tselect/schema.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/schema)
[![npm](https://img.shields.io/npm/dm/@tselect/schema.svg?style=flat-square)](https://www.npmjs.com/package/@tselect/schema)
[![CI](https://img.shields.io/github/actions/workflow/status/tselect-npm/schema/ci.yml?branch=main&style=flat-square)](https://github.com/tselect-npm/schema/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/coverallsCoverage/github/tselect-npm/schema?branch=main&style=flat-square)](https://coveralls.io/github/tselect-npm/schema?branch=main)
[![license](https://img.shields.io/npm/l/@tselect/schema.svg?style=flat-square)](./LICENSE)

Typed, programmatic JSON schemas.

Writing JSON Schema by hand is verbose: every object needs its quotes and its `additionalProperties`. This package
wraps the common shapes in typed factories and adds utilities for composing and reshaping the result. It consumes and
produces plain JSON Schema objects with little to no processing — anything you already wrote can be passed straight in.

Ships both ESM and CommonJS builds, with TypeScript types for each.

Two positions the factories take, so you don't have to repeat yourself:

- `additionalProperties` is `false` for `object` schemas unless you say otherwise.
- `additionalItems` is `false` for `array` schemas unless you say otherwise.

## Requirements

**Node 22 or newer** (`engines.node` is `>=22`) — every line still receiving security support. Each release is tested
on 22, 24 and 26; the declared floor is the lowest version CI actually runs, not a guess.

## Installation

```bash
npm i @tselect/schema
```

```bash
pnpm add @tselect/schema
```

## Usage

```typescript
import * as Schema from '@tselect/schema';

const user = Schema.object(
  {
    id: Schema.uuid(),
    email: Schema.email(),
    age: Schema.integer({ minimum: 0 }),
  },
  { required: ['id', 'email'] },
);
```

Named imports and `require()` both work:

```typescript
import { email, object, omitProperties } from '@tselect/schema';
```

```javascript
const { object, email } = require('@tselect/schema');
```

The result is an ordinary JSON Schema object, so a validator takes it as-is:

```typescript
import { Ajv } from 'ajv';

const validate = new Ajv().compile(user);

validate({ id: '00000000-0000-0000-0000-000000000000', age: 3 }); // true
validate({ id: 'nope' });                                         // false
```

Two things to know when validating with ajv 8 specifically:

- `format` keywords — everything `email()`, `date()` and `dateTime()` produce — are not built in. Compiling such a
  schema **throws** `unknown format` unless you add [`ajv-formats`](https://npm.im/ajv-formats).
- A schema whose `type` is a union of two non-`null` types, which is what `enumeration()` over mixed values produces,
  logs a strict-mode warning unless ajv is constructed with `{ allowUnionTypes: true }`. `nullable: true` schemas are
  not affected: ajv accepts `['string', 'null']` without it.

> **Some factories mutate the options object you pass.** `date`, `dateTime`, `email`, `uuid`, `array`, `list`, `tuple`,
> `object` and `enumeration` write their computed keys — `format`, `pattern`, `items`, `properties`,
> `additionalItems`/`additionalProperties`, `enum` — onto the argument rather than onto a copy, and `any` returns the
> argument itself. `string`, `number`, `integer` and `boolean` do not. Pass a fresh object literal if you intend to
> reuse it.

## API

### Types

`TJSONSchema` is the base type: the keywords this package models by name, plus a `[key: string]: any` index signature
that keeps the whole of JSON Schema reachable. The rest narrow it — `TStringJSONSchema`, `TNumberJSONSchema`,
`TIntegerJSONSchema`, `TBooleanJSONSchema`, `TArrayJSONSchema` and `TObjectJSONSchema<T>`, which carries the shape `T`
through `properties` and `required`.

`TOptions<T>` is what the factories accept: `Partial<T>` plus `TCommonOptions`, i.e. `{ nullable?: boolean }`.

### Constants

#### `JSONSchemaType`

```typescript
Schema.JSONSchemaType.OBJECT; // 'object'
// also ARRAY, STRING, INTEGER, BOOLEAN, NULL, NUMBER
```

#### `JSONStringFormat`

```typescript
Schema.JSONStringFormat.DATE_TIME; // 'date-time'
// also DATE, EMAIL, HOSTNAME, IPV4, IPV6, URI
```

### Scalar factories

Each takes `TOptions<...>` and returns the corresponding schema. `nullable: true` turns `type` into a two-member array
and is stripped from the output.

#### `string(options?): TStringJSONSchema`

```typescript
Schema.string();                                // { type: 'string' }
Schema.string({ minLength: 3, maxLength: 10 }); // { minLength: 3, maxLength: 10, type: 'string' }
Schema.string({ nullable: true });              // { type: ['string', 'null'] }
```

#### `number(options?): TNumberJSONSchema`

```typescript
Schema.number({ minimum: 0 }); // { minimum: 0, type: 'number' }
```

#### `integer(options?): TIntegerJSONSchema`

```typescript
Schema.integer({ multipleOf: 2 }); // { multipleOf: 2, type: 'integer' }
```

#### `boolean(options?): TBooleanJSONSchema`

```typescript
Schema.boolean(); // { type: 'boolean' }
```

#### `date(options?)` · `dateTime(options?)` · `email(options?)`

`string()` with `format` preset.

```typescript
Schema.date();     // { format: 'date', type: 'string' }
Schema.dateTime(); // { format: 'date-time', type: 'string' }
Schema.email();    // { format: 'email', type: 'string' }
```

#### `uuid(options?): TStringJSONSchema`

`string()` with a `pattern` matching a canonical UUID. There is no `uuid` format in draft-07, so this is a regex rather
than a `format`.

```typescript
Schema.uuid();
// {
//   pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
//   type: 'string'
// }
```

#### `any(options): TJSONSchema`

Returns its argument untouched. Use it for a schema this package has no factory for.

```typescript
Schema.any({ title: 'Anything' }); // { title: 'Anything' }
```

### Collection factories

#### `array(options?): TArrayJSONSchema`

```typescript
Schema.array(); // { additionalItems: false, type: 'array' }
```

#### `list(type, options?): TArrayJSONSchema`

An array whose every item matches one schema.

```typescript
Schema.list(Schema.string());
// { items: { type: 'string' }, additionalItems: false, type: 'array' }
```

#### `tuple(types, options?): TArrayJSONSchema`

An array whose items match a positional list of schemas.

```typescript
Schema.tuple([Schema.string(), Schema.integer()]);
// { items: [{ type: 'string' }, { type: 'integer' }], additionalItems: false, type: 'array' }
```

#### `object(properties, options?): TObjectJSONSchema<T>`

```typescript
Schema.object({ foo: Schema.email() });
// {
//   properties: { foo: { format: 'email', type: 'string' } },
//   additionalProperties: false,
//   type: 'object'
// }
```

`options.properties`, if given, replaces the positional argument rather than merging with it. Every JSON Schema keyword
is accepted through `options`, so an existing schema round-trips unchanged:

```typescript
Schema.object(
  {},
  {
    type: Schema.JSONSchemaType.OBJECT,
    required: ['foo'],
    additionalProperties: true,
    properties: { foo: { type: Schema.JSONSchemaType.STRING, format: Schema.JSONStringFormat.EMAIL } },
  },
);
// the same object back
```

`type` and `format` are typed as the `JSONSchemaType` and `JSONStringFormat` enums, not as bare strings, so a schema
literal copied out of a `.json` file needs the enum members — or an assertion — to typecheck. The values are identical
either way; this is a compile-time distinction only.

#### `enumeration(enumOrValues, options?): TJSONSchema`

Takes an array of values, or a TypeScript enum object. `type` is always an array, one member per distinct value type
found. Throws for any value that is not a string, a number or `null`.

```typescript
Schema.enumeration(['a', 'b']); // { enum: ['a', 'b'], type: ['string'] }
Schema.enumeration([1, 'two']); // { enum: [1, 'two'], type: ['number', 'string'] }

enum Colour {
  RED = 'red',
  BLUE = 'blue',
}
Schema.enumeration(Colour); // { enum: ['red', 'blue'], type: ['string'] }
```

### Combinators

#### `anyOf(possibilities)` · `oneOf(possibilities)` · `allOf(possibilities)`

Untyped wrappers around the corresponding keyword.

```typescript
Schema.anyOf([Schema.string(), Schema.integer()]);
// { anyOf: [{ type: 'string' }, { type: 'integer' }] }
```

### Utilities

#### `nullable(schema, value?): T`

Adds `'null'` to `type`, or to the `anyOf`/`oneOf` branches when the schema has no `type`. Pass `false` to remove it.
Throws for a schema with neither.

```typescript
Schema.nullable(Schema.string());                           // { type: ['string', 'null'] }
Schema.nullable(Schema.string({ nullable: true }), false);  // { type: 'string' }
```

#### `clone(schema): T`

A deep clone.

#### `cloneWith(schema, overrides)`

Clone, then shallow-assign `overrides` over the top. Array-valued keys are **replaced**.

```typescript
Schema.cloneWith(Schema.object({ foo: Schema.string() }), { required: ['foo'] });
// { properties: { foo: { type: 'string' } }, additionalProperties: false, type: 'object', required: ['foo'] }
```

#### `mergeWith(schema, overrides)`

Clone, then deep-merge `overrides`. Array-valued keys are **concatenated** — this is the difference from `cloneWith`.

```typescript
Schema.mergeWith(
  Schema.object({ foo: Schema.string() }, { required: ['foo'] }),
  Schema.object({ bar: Schema.integer() }, { required: ['bar'] }),
);
// {
//   required: ['foo', 'bar'],
//   properties: { foo: { type: 'string' }, bar: { type: 'integer' } },
//   additionalProperties: false,
//   type: 'object'
// }
```

#### `omitProperties(schema, properties)` · `pickProperties(schema, properties)`

Return a clone with `properties` filtered, and `required` filtered to match.

```typescript
const user = Schema.object(
  { foo: Schema.email(), bar: Schema.integer() },
  { required: ['foo', 'bar'] },
);

Schema.omitProperties(user, ['bar']);
// { required: ['foo'], properties: { foo: { format: 'email', type: 'string' } }, additionalProperties: false, type: 'object' }

Schema.pickProperties(user, ['foo']);
// the same result, reached from the other direction
```

#### `requireProperties(schema, properties, options?)`

Returns a clone with `required` set to `properties`. Pass `{ preserveExisting: true }` to union with the existing
`required` instead of replacing it.

```typescript
const pair = Schema.object({ foo: Schema.string(), bar: Schema.string() }, { required: ['bar'] });

Schema.requireProperties(pair, ['foo']);                             // required: ['foo']
Schema.requireProperties(pair, ['foo'], { preserveExisting: true }); // required: ['foo', 'bar']
```

#### `isJSONSchemaLike(obj): obj is TJSONSchema`

A type guard: true for a plain object carrying `type`, `allOf`, `anyOf` or `oneOf`.

```typescript
Schema.isJSONSchemaLike(Schema.string()); // true
Schema.isJSONSchemaLike({ foo: 1 });      // false
```

#### `toStringRegExp(regExp): string`

Renders a `RegExp` as a JSON Schema `pattern`. Throws if the expression carries flags — JSON Schema has nowhere to put
them.

```typescript
Schema.toStringRegExp(/^\d+$/); // '^\\d+$'
```

#### `cleanOptions(options, overrides?)` · `makeSchema(options, type)`

The internals the factories are built from, exported for building your own.

```typescript
Schema.cleanOptions({ nullable: true, title: 'T' }); // { title: 'T' } — strips `nullable`
Schema.makeSchema({ minLength: 1 }, 'string');       // { minLength: 1, type: 'string' }
```

## License

[MIT](./LICENSE) © Sylvain Estevez
