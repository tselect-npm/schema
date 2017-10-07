import { TOptions } from '../types/options';
import { TIntegerJSONSchema } from '../types/integer-json-schema';
import { makeSchema } from '../utils/make-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export function integer(options: TOptions<TIntegerJSONSchema> = {}): TIntegerJSONSchema {
  return makeSchema<TIntegerJSONSchema>(options, JSONSchemaType.INTEGER);
}