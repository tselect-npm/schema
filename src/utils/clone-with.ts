import { TObjectJSONSchema } from '..';
import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function cloneWith<T extends TJSONSchema = TJSONSchema, O extends (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>) = (T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>)>(schema: T, overrides: O): O extends TObjectJSONSchema<infer U> ? TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'> : T & O {
  return Object.assign(clone(schema), overrides) as (O extends TObjectJSONSchema<infer U> ? TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'> : T & O);
}
