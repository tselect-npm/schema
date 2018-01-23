import * as Lodash from 'lodash';
import { TJSONSchema } from '../types/json-schema';

export function isJSONSchema(obj: {}): obj is TJSONSchema {
  return Lodash.isPlainObject(obj) && (
    `type` in obj
    ||
    `allOf` in obj
    ||
    `anyOf` in obj
    ||
    `oneOf` in obj
  );
}