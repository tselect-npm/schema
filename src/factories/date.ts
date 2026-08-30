import { JSONStringFormat } from '../constants/json-string-format';
import type { TOptions } from '../types/options';
import type { TStringJSONSchema } from '../types/string-json-schema';
import { string } from './string';

export function date(options: TOptions<TStringJSONSchema> = {}): TStringJSONSchema {
  options.format = JSONStringFormat.DATE;
  return string(options);
}
