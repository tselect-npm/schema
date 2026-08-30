import Lodash from 'lodash';
import type { TCommonOptions } from '../types/common-options';
import type { TJSONSchema } from '../types/json-schema';

export function cleanOptions<T extends TJSONSchema = TJSONSchema>(options: TCommonOptions, overrides?: Partial<T>): T {
  return <T>Object.assign(Lodash.omit(options, ['nullable']), overrides);
}
