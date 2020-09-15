import * as Lodash from 'lodash';
import { TObjectJSONSchema } from '..';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function mergeWith<T extends TJSONSchema = TJSONSchema, O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>) = (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>)>(schema: T, overrides: O): O extends TObjectJSONSchema<infer U> ? T extends TObjectJSONSchema<infer V> ? TObjectJSONSchema<U & V> & Omit<T, 'required' | 'properties'> : TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'> : T & O {
  return Lodash.mergeWith(clone(schema), overrides, (obj: any, src: any) => {
    if (Lodash.isArray(obj)) {
      return obj.concat(src);
    }
    return undefined;
  }) as (O extends TObjectJSONSchema<infer U> ? T extends TObjectJSONSchema<infer V> ? TObjectJSONSchema<U & V> & Omit<T, 'required' | 'properties'> : TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'> : T & O);
}
