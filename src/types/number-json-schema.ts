import { TJSONSchema } from './json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export type TNumberJSONSchema = TJSONSchema & {
  type?: JSONSchemaType.NUMBER | [JSONSchemaType.NULL, JSONSchemaType.NUMBER],
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};