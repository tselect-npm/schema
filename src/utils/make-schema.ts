import { JSONSchemaType } from '../constants/json-schema-type';
import { TJSONSchema } from '../types/json-schema';
import { TOptions } from '../types/options';
import { cleanOptions } from './clean-options';
import { nullable } from './nullable';

export function makeSchema<T extends TJSONSchema = TJSONSchema>(options: TOptions<T>, type: JSONSchemaType): T {
  return nullable(cleanOptions<T>(options, { type } as any), options.nullable || false);
}
