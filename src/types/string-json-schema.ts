import { TJSONSchema } from './json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export type TStringJSONSchema = TJSONSchema & {
  type: JSONSchemaType.STRING | [JSONSchemaType.NULL, JSONSchemaType.STRING],
  maxLength?: number;
  minLength?: number;
  pattern?: string;
};