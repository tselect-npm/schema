import { JSONSchemaType } from '../constants/json-schema-type';
import type { TArrayJSONSchema } from '../types/array-json-schema';
import type { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function array(options: TOptions<TArrayJSONSchema> = {}) {
  return makeSchema<TArrayJSONSchema>(
    Object.assign(options, { additionalItems: options.additionalItems || false }),
    JSONSchemaType.ARRAY,
  );
}
