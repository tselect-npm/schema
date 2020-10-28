import * as Lodash from 'lodash';
import { TObjectJSONSchema } from '../types/object-json-schema';
import { clone } from './clone';

export function pickProperties(schema: TObjectJSONSchema, properties: string[]): TObjectJSONSchema {
  const cloned = clone(schema);
  if (cloned.properties) {
    Object.assign(cloned, { properties: Lodash.pick(cloned.properties, properties) });
  }
  if (cloned.required) {
    Object.assign(cloned, { required: Lodash.intersection(cloned.required, properties) });
  }
  return cloned;
}
