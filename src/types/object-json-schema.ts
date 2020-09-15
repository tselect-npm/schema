import { TJSONSchema } from './json-schema';
import { TNumberJSONSchema } from './number-json-schema';
import { TStringJSONSchema } from './string-json-schema';

type TProperties<T extends { [key: string]: unknown }, key extends keyof T> = undefined | (T[key] extends number ? TNumberJSONSchema : T[key] extends string ? TStringJSONSchema : TJSONSchema);

export type TObjectJSONSchema<T extends { [key: string]: unknown } = any> = TJSONSchema & {
  maxProperties?: number;
  minProperties?: number;
  required?: (keyof T)[];
  additionalProperties?: boolean | TJSONSchema;
  definitions?: { [key: string]: TJSONSchema };
  properties?: {
    [key in keyof T]: TProperties<T, key>;
  };
  patternProperties?: { [pattern: string]: TJSONSchema };
  dependencies?: { [key: string]: TJSONSchema | string[] };
};
