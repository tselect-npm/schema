import { JSONSchemaType } from '../constants/json-schema-type';
import { TNumberJSONSchema } from '../types/number-json-schema';
import { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function number(options: TOptions<TNumberJSONSchema> = {}): TNumberJSONSchema {
  return makeSchema<TNumberJSONSchema>(options, JSONSchemaType.NUMBER);
}
