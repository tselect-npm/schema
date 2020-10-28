import { TOptions } from '../types/options';
import { TStringJSONSchema } from '../types/string-json-schema';
import { toStringRegExp } from '../utils/to-string-reg-exp';
import { string } from './string';

const UUID_PATTERN: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export function uuid(options: TOptions<TStringJSONSchema> = {}): TStringJSONSchema {
  return string(Object.assign(options, { pattern: toStringRegExp(UUID_PATTERN) }));
}
