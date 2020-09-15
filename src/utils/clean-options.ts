import * as Lodash from 'lodash';
import { TCommonOptions } from '../types/common-options';
import { TJSONSchema } from '../types/json-schema';

export function cleanOptions<T extends TJSONSchema = TJSONSchema>(options: TCommonOptions, overrides?: Partial<T>): T {
  return <T>Object.assign(Lodash.omit(options, ['nullable']), overrides);
}
