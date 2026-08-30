import type { JSONSchemaType } from '../constants/json-schema-type';
import type { TJSONSchema } from '../types/json-schema';
import type { TOptions } from '../types/options';
import { cleanOptions } from './clean-options';
import { nullable } from './nullable';

export function makeSchema<T extends TJSONSchema = TJSONSchema>(options: TOptions<T>, type: JSONSchemaType): T {
  return nullable(cleanOptions<T>(options, { type } as Partial<T>), options.nullable || false);
}
