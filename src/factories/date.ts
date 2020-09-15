import { JSONStringFormat } from '../constants/json-string-format';
import { TOptions } from '../types/options';
import { TStringJSONSchema } from '../types/string-json-schema';
import { string } from './string';

export function date(options: TOptions<TStringJSONSchema> = {}): TStringJSONSchema {
  options.format = JSONStringFormat.DATE;
  return string(options);
}
