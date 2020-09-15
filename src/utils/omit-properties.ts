import * as Lodash from 'lodash';
import { TObjectJSONSchema } from '../types/object-json-schema';
import { clone } from './clone';

export function omitProperties(schema: TObjectJSONSchema, properties: string[]): TObjectJSONSchema {
  const cloned = clone(schema);

  if (schema.properties) {
    Object.assign(cloned, { properties: Lodash.omit(cloned.properties, properties) });
  }

  if (schema.required) {
    Object.assign(cloned, { required: Lodash.difference(cloned.required, properties) });
  }

  return cloned;
}
