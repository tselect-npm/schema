import { JSONSchemaType } from '../constants/json-schema-type';
import type { TNumberJSONSchema } from '../types/number-json-schema';
import type { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function number(options: TOptions<TNumberJSONSchema> = {}): TNumberJSONSchema {
  return makeSchema<TNumberJSONSchema>(options, JSONSchemaType.NUMBER);
}
