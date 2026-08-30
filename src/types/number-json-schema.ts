import type { JSONSchemaType } from '../constants/json-schema-type';
import type { TJSONSchema } from './json-schema';

export type TNumberJSONSchema = TJSONSchema & {
  type?: JSONSchemaType.NUMBER | [JSONSchemaType.NULL, JSONSchemaType.NUMBER];
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};
