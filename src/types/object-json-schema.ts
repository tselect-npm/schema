import type { TJSONSchema } from './json-schema';

// The `= any` default is load-bearing: it makes `keyof T` resolve to
// `string | number | symbol`, which is what keeps the bare `TObjectJSONSchema`
// — the parameter type of `omitProperties`, `pickProperties` and
// `requireProperties` — accepting a `TObjectJSONSchema<SomeType>`. Narrowing it
// to `Record<string, unknown>` would tighten `required` and `properties` on the
// package's second-most-used type.
// biome-ignore lint/suspicious/noExplicitAny: see above
export type TObjectJSONSchema<T extends { [key: string]: unknown } = any> = TJSONSchema & {
  maxProperties?: number;
  minProperties?: number;
  required?: (keyof T)[];
  additionalProperties?: boolean | TJSONSchema;
  definitions?: { [key: string]: TJSONSchema };
  properties?: {
    [key in keyof T]?: TJSONSchema;
  };
  patternProperties?: { [pattern: string]: TJSONSchema };
  dependencies?: { [key: string]: TJSONSchema | string[] };
};
