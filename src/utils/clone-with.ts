import { TJSONSchema } from '../types/json-schema';
import { clone } from './clone';

export function cloneWith<T extends TJSONSchema = TJSONSchema, O extends Partial<T> = T>(schema: T, overrides: O): T & O {
  return Object.assign(clone(schema), overrides);
}
