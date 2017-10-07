import { TJSONSchema } from './json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';
import { JSONStringFormat } from '../constants/json-string-format';

export type TStringJSONSchema = TJSONSchema & {
  type?: JSONSchemaType.STRING | [JSONSchemaType.NULL, JSONSchemaType.STRING],
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: JSONStringFormat
};