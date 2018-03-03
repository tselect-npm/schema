import { TJSONSchema } from './json-schema';

export type TObjectJSONSchema<T extends {} = any> = TJSONSchema & {
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  additionalProperties?: boolean | TJSONSchema;
  definitions?: { [key: string]: TJSONSchema };
  properties?: { [key in keyof T]: TJSONSchema };
  patternProperties?: { [pattern: string]: TJSONSchema };
  dependencies?: { [key: string]: TJSONSchema | string[] };
}