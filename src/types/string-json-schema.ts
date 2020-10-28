import { JSONSchemaType } from '../constants/json-schema-type';
import { JSONStringFormat } from '../constants/json-string-format';
import { TJSONSchema } from './json-schema';

export type TStringJSONSchema = TJSONSchema & {
  type?: JSONSchemaType.STRING | [JSONSchemaType.NULL, JSONSchemaType.STRING],
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: JSONStringFormat
};
