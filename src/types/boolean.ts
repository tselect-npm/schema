import { TJSONSchema } from './json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export type TBooleanJSONSchema = TJSONSchema & {
  type: JSONSchemaType.BOOLEAN | [JSONSchemaType.BOOLEAN, JSONSchemaType.NULL]
};