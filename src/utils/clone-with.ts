import { TObjectJSONSchema } from '..';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

type TCloneWithReturn<
  O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>),
  T extends TJSONSchema = TJSONSchema
> = O extends TObjectJSONSchema<infer U>
  ? TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'>
  : T & O;

export function cloneWith<T extends TJSONSchema = TJSONSchema, O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>) = (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>)>(schema: T, overrides: O): TCloneWithReturn<O, T> {
  return Object.assign(clone(schema), overrides) as TCloneWithReturn<O, T>;
}
