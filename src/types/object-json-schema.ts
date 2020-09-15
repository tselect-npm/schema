import { TJSONSchema } from './json-schema';

export type TObjectJSONSchema<T extends { [key: string]: unknown } = any> = TJSONSchema & {
  maxProperties?: number;
  minProperties?: number;
  required?: (keyof T)[];
  additionalProperties?: boolean | TJSONSchema;
  definitions?: { [key: string]: TJSONSchema };
  properties?: { [key in keyof T]: TJSONSchema };
  patternProperties?: { [pattern: string]: TJSONSchema };
  dependencies?: { [key: string]: TJSONSchema | string[] };
};
