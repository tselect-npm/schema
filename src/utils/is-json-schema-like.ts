import Lodash from 'lodash';
import type { TJSONSchema } from '../types/json-schema';

export function isJSONSchemaLike(obj: unknown): obj is TJSONSchema {
  if (!Lodash.isPlainObject(obj)) {
    return false;
  }

  // `isPlainObject` is not declared as a type guard in @types/lodash, so the
  // shape has to be reasserted before the `in` checks below.
  const candidate = obj as Record<string, unknown>;

  return 'type' in candidate || 'allOf' in candidate || 'anyOf' in candidate || 'oneOf' in candidate;
}
