import { TOptions } from '../types/options';
import { TArrayJSONSchema } from '../types/array-json-schema';
import { makeSchema } from '../utils/make-schema';
import { JSONSchemaType } from '../constants/json-schema-type';

export function array(options: TOptions<TArrayJSONSchema> = {}) {
  return makeSchema(Object.assign(options, { additionalItems: options.additionalItems || false }), JSONSchemaType.ARRAY);
}