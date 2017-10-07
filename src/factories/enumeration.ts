import { JSONSchemaType } from '../constants/json-schema-type';
import { any } from './any';
import { number } from './number';
import { string } from './string';
import { TOptions } from '../types/options';
import { TJSONSchema } from '../types/json-schema';
import { TNumberJSONSchema } from '../types/number-json-schema';
import { TStringJSONSchema } from '../types/string-json-schema';

export function enumeration<E>(enumOrValues: E | (string | number | null)[], options: TOptions<TJSONSchema | TNumberJSONSchema | TStringJSONSchema> = {}): any {
  const values = Object.values(enumOrValues);
  const types: Set<JSONSchemaType> = new Set();
  const finalOptions: TJSONSchema | TNumberJSONSchema | TStringJSONSchema = Object.assign(options, { enum: values });

  for (const value of values) {
    let jsonSchemaType: JSONSchemaType;

    if (value === null) {
      jsonSchemaType = JSONSchemaType.NULL;
    } else {
      const typeOfValue = typeof value;

      switch (typeOfValue) {
        case 'string':
          jsonSchemaType = JSONSchemaType.STRING;
          break;
        case 'number':
          jsonSchemaType = JSONSchemaType.NUMBER;
          break;
        default:
          throw new Error(`Unsupported enum value type : ${typeOfValue}`);
      }
    }

    types.add(jsonSchemaType);
  }

  return any(Object.assign(finalOptions, { type: Array.from(types) }));
}