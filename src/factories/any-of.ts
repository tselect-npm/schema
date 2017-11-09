import { TJSONSchema } from '../types/json-schema';

export function anyOf<T extends TJSONSchema>(possibilities: T[]): TJSONSchema {
  return {
    anyOf: possibilities
  };
}