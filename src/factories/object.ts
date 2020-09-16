import { JSONSchemaType } from '../constants/json-schema-type';
import { TJSONSchema } from '../types/json-schema';
import { TObjectJSONSchema } from '../types/object-json-schema';
import { TOptions } from '../types/options';
import { makeSchema } from '../utils/make-schema';

export function object<T extends {} = any>(properties: { [key in keyof T]?: TJSONSchema }, options: TOptions<TObjectJSONSchema<T>> = {}): TObjectJSONSchema<T> {
  if (options.properties) {
    properties = options.properties;
  }
  return makeSchema<TObjectJSONSchema<T>>(Object.assign(options, { properties, additionalProperties: options.additionalProperties || false }), JSONSchemaType.OBJECT) as TObjectJSONSchema<T>;
}
