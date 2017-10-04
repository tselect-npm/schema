import { TJSONSchema } from './json-schema';

export type TObjectJSONSchema = TJSONSchema & {
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  additionalProperties?: boolean | TJSONSchema;
  definitions?: { [key: string]: TJSONSchema };
  properties?: { [property: string]: TJSONSchema };
  patternProperties?: { [pattern: string]: TJSONSchema };
  dependencies?: { [key: string]: TJSONSchema | string[] };
}