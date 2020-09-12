import * as Lodash from 'lodash';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function mergeWith<T extends TJSONSchema = TJSONSchema, K extends TJSONSchema = TJSONSchema> (schema: T, overrides: K): T & K {
  return Lodash.mergeWith(clone(schema), overrides, (obj: any, src: any) => {
    if (Lodash.isArray(obj)) {
      return obj.concat(src);
    }
    return undefined;
  });
}