import { JSONSchemaType } from '../constants/json-schema-type';
import type { TJSONSchema } from '../types/json-schema';
import type { TObjectJSONSchema } from '../types/object-json-schema';
import type { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

// `{}` rather than `object` or `Record<string, unknown>`: it is the only
// constraint that both accepts an interface (which never gets an implicit index
// signature) and satisfies `TObjectJSONSchema`'s own `{ [key: string]: unknown }`
// constraint below. Narrowing it would be a compile-time break for callers
// passing an interface as `T`.
// biome-ignore lint/suspicious/noExplicitAny: `= any` keeps the bare `object(...)` call inferring as it always has
export function object<T extends {} = any>(
  properties: { [key in keyof T]?: TJSONSchema },
  options: TOptions<TObjectJSONSchema<T>> = {},
): TObjectJSONSchema<T> {
  if (options.properties) {
    properties = options.properties;
  }
  return makeSchema<TObjectJSONSchema<T>>(
    Object.assign(options, { properties, additionalProperties: options.additionalProperties || false }),
    JSONSchemaType.OBJECT,
  );
}
