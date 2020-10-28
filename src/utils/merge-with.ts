import * as Lodash from 'lodash';
import { TObjectJSONSchema } from '..';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

type TMergeWithReturn<
  O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>), T extends TJSONSchema = TJSONSchema
> = O extends TObjectJSONSchema<infer U>
  ? T extends TObjectJSONSchema<infer V>
    ? TObjectJSONSchema<U & V> & Omit<T, 'required' | 'properties'>
    : TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'>
  : T & O;

export function mergeWith<T extends TJSONSchema = TJSONSchema, O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>) = (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>)>(schema: T, overrides: O): TMergeWithReturn<O, T> {
  return Lodash.mergeWith(clone(schema), overrides, (obj: any, src: any) => {
    if (Lodash.isArray(obj)) {
      return obj.concat(src);
    }
    return undefined;
  }) as TMergeWithReturn<O,  T>;
}
