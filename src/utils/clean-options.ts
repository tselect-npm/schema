import * as Lodash from 'lodash';
import { TJSONSchema } from '../types/json-schema';
import { TCommonOptions } from '../types/common-options';

export function cleanOptions<T extends TJSONSchema = TJSONSchema>(options: TCommonOptions, overrides?: Partial<T>): T {
  return <T>Object.assign(Lodash.omit(options, ['nullable']), overrides);
}