import * as Lodash from 'lodash';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function mergeWith<T extends TJSONSchema = TJSONSchema, O extends Partial<T> = T>(schema: T, overrides: O): T & O {
  return Lodash.mergeWith(clone(schema), overrides, (obj: any, src: any) => {
    if (Lodash.isArray(obj)) {
      return obj.concat(src);
    }
    return undefined;
  });
}
