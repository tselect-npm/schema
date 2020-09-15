import { JSONSchemaType } from '../constants/json-schema-type';
import { TArrayJSONSchema } from '../types/array-json-schema';
import { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function array(options: TOptions<TArrayJSONSchema> = {}) {
  return makeSchema<TArrayJSONSchema>(Object.assign(options, { additionalItems: options.additionalItems || false }), JSONSchemaType.ARRAY);
}
