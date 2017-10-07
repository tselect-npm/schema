import { makeSchema } from '../utils/make-schema';
import { TObjectJSONSchema } from '../types/object-json-schema';
import { TJSONSchema } from '../types/json-schema';
import { TOptions } from '../types/options';
import { JSONSchemaType } from '../constants/json-schema-type';

export function object(propertiesOrOptions: { [property: string]: TJSONSchema } | TOptions<TObjectJSONSchema>, options: TOptions<TObjectJSONSchema> = {}): TObjectJSONSchema {
  const properties = !options.properties ? propertiesOrOptions : (<TObjectJSONSchema>propertiesOrOptions).properties;
  options = properties === propertiesOrOptions ? options : <TOptions<TObjectJSONSchema>>propertiesOrOptions;
  return makeSchema<TObjectJSONSchema>(Object.assign(options, { properties: properties, additionalProperties: options.additionalProperties || false }), JSONSchemaType.OBJECT);
}