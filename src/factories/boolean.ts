import { JSONSchemaType } from '../constants/json-schema-type';
import type { TBooleanJSONSchema } from '../types/boolean-json-schema';
import type { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function boolean(options: TOptions<TBooleanJSONSchema> = {}): TBooleanJSONSchema {
  return makeSchema(options, JSONSchemaType.BOOLEAN);
}
