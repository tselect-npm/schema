import { TObjectJSONSchema } from '../types/object-json-schema';
import { clone } from './clone';
import * as Lodash from 'lodash';

export function pickProperties(schema: TObjectJSONSchema, properties: string[]): TObjectJSONSchema {
  const cloned = clone(schema);
  if (schema.properties) {
    Object.assign(cloned, { properties: Lodash.pick(cloned.properties, properties) });
  }
  if (schema.required) {
    Object.assign(cloned, { required: Lodash.intersection(cloned.required, properties) })
  }
  return cloned;
}