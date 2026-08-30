import type { JSONSchemaType } from '../constants/json-schema-type';
import type { TNumberJSONSchema } from './number-json-schema';

export type TIntegerJSONSchema = TNumberJSONSchema & {
  type: JSONSchemaType.INTEGER | [JSONSchemaType.NULL, JSONSchemaType.INTEGER];
};
