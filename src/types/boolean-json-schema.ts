import { JSONSchemaType } from '../constants/json-schema-type';
import { TJSONSchema } from './json-schema';

export type TBooleanJSONSchema = TJSONSchema & {
  type: JSONSchemaType.BOOLEAN | [JSONSchemaType.BOOLEAN, JSONSchemaType.NULL]
};
