import { TArrayJSONSchema } from '../types/array-json-schema';
import { TJSONSchema } from '../types/json-schema';
import { TOptions } from '../types/options';
import { array } from './array';

export function list(type: TJSONSchema, options: TOptions<TArrayJSONSchema> = {}): TArrayJSONSchema {
  return array(Object.assign(options, { items: type }));
}
