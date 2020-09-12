import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function cloneWith<T extends TJSONSchema = TJSONSchema, K extends TJSONSchema = TJSONSchema> (schema: T, overrides: K): T & K {
  return Object.assign(clone(schema), overrides);
}