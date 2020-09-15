import { JSONSchemaType } from '../constants/json-schema-type';
import { TIntegerJSONSchema } from '../types/integer-json-schema';
import { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function integer(options: TOptions<TIntegerJSONSchema> = {}): TIntegerJSONSchema {
  return makeSchema<TIntegerJSONSchema>(options, JSONSchemaType.INTEGER);
}
