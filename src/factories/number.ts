import { TOptions } from '../types/options';
import { TNumberJSONSchema } from '../types/number-json-schema';
import { makeSchema } from '../utils/make-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export function number(options: TOptions<TNumberJSONSchema> = {}): TNumberJSONSchema {
  return makeSchema<TNumberJSONSchema>(options, JSONSchemaType.NUMBER);
}