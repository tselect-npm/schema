import Lodash from 'lodash';
import type { TJSONSchema } from '../types/json-schema';

export function clone<T extends TJSONSchema = TJSONSchema>(schema: T): T {
  return Lodash.cloneDeep(schema);
}
