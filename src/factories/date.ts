import { TOptions } from '../types/options';
import { TStringJSONSchema } from '../types/string-json-schema';
import { string } from './string';
import { JSONStringFormat } from '../constants/json-string-format';

export function date(options: TOptions<TStringJSONSchema> = {}): TStringJSONSchema {
  options.format = JSONStringFormat.DATE;
  return string(options)
}