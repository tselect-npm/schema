import { JSONStringFormat } from '../constants/json-string-format';
import { TOptions } from '../types/options';
import { TStringJSONSchema } from '../types/string-json-schema';
import { string } from './string';

export function email(options: TOptions<TStringJSONSchema> = {}): TStringJSONSchema {
  return string(Object.assign(options, { format: JSONStringFormat.EMAIL }));
}
