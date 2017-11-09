import { TJSONSchema } from '../types/json-schema';

export function allOf<T extends TJSONSchema>(possibilities: T[]): TJSONSchema {
  return {
    allOf: possibilities
  };
}