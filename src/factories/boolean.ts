import { TOptions } from '../types/options';
import { TBooleanJSONSchema } from '../types/boolean';
import { makeSchema } from '../utils/make-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export function boolean(options: TOptions<TBooleanJSONSchema> = {}): TBooleanJSONSchema {
  return makeSchema(options, JSONSchemaType.BOOLEAN);
}