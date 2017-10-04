import { TObjectJSONSchema } from '../types/object-json-schema';
import { ObjectSchema } from '../classes/object-schema';

export function object(jsonSchema: TObjectJSONSchema): ObjectSchema {
  return new ObjectSchema(jsonSchema);
}