import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function cloneWith<T extends TJSONSchema = TJSONSchema> (schema: T, overrides: Partial<T>): T {
  return Object.assign(clone(schema), overrides);
}