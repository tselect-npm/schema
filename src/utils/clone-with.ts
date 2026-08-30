import type { TJSONSchema } from '../types/json-schema';
import type { TObjectJSONSchema } from '../types/object-json-schema';
import { clone } from './clone';

// The shape `cloneWith` accepts as its second argument, named so that callers
// building an override object generically can assert against it without `any`.
export type TCloneWithOverrides<T extends TJSONSchema> = T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>;

type TCloneWithReturn<
  O extends T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T>,
  T extends TJSONSchema = TJSONSchema,
> = O extends TObjectJSONSchema<infer U> ? TObjectJSONSchema<U> & Omit<T, 'required' | 'properties'> : T & O;

export function cloneWith<
  T extends TJSONSchema = TJSONSchema,
  O extends T extends TObjectJSONSchema ? TObjectJSONSchema : Partial<T> = T extends TObjectJSONSchema
    ? TObjectJSONSchema
    : Partial<T>,
>(schema: T, overrides: O): TCloneWithReturn<O, T> {
  return Object.assign(clone(schema), overrides) as TCloneWithReturn<O, T>;
}
