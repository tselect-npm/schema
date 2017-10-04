import { JSONSchemaType } from '../constants/json-schema-type';
import { TNumberJSONSchema } from './number-json-schema';

export type TIntegerJSONSchema = TNumberJSONSchema & {
  type: JSONSchemaType.INTEGER | [JSONSchemaType.NULL, JSONSchemaType.INTEGER]
};