import { TJSONSchema } from '../types/json-schema';

export function oneOf<T extends TJSONSchema>(possibilities: T[]): TJSONSchema {
  return {
    oneOf: possibilities
  };
}