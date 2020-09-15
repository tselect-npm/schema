import { JSONSchemaType } from '../constants/json-schema-type';
import { TJSONSchema } from './json-schema';

export type TArrayJSONSchema = TJSONSchema & {
  type: JSONSchemaType.ARRAY | [JSONSchemaType.NULL, JSONSchemaType.ARRAY],
  additionalItems?: boolean | TJSONSchema;
  items?: TJSONSchema | TJSONSchema[];
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
};
