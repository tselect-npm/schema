import Lodash from 'lodash';
import type { TJSONSchema } from '../types/json-schema';
import type { TOptions } from '../types/options';

// `TOptions<TJSONSchema>` rather than `TCommonOptions`: the function strips
// `nullable` from an options object and returns everything else, so a parameter
// typed as only `{ nullable?: boolean }` made every direct call fail excess
// property checking — `cleanOptions({ nullable: true, title: 'T' })` did not
// compile, despite being exactly what the function is for. Strictly widening;
// every call that compiled against the old signature still does.
export function cleanOptions<T extends TJSONSchema = TJSONSchema>(
  options: TOptions<TJSONSchema>,
  overrides?: Partial<T>,
): T {
  return <T>Object.assign(Lodash.omit(options, ['nullable']), overrides);
}
