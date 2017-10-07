import { TJSONSchema } from '../types/json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';
import { Utils } from '@bluejay/utils';
import { cloneWith } from './clone-with';

export function nullable<T extends TJSONSchema = TJSONSchema>(schema: T, value = true): T {
  if (schema.type) {
    const baseTypes = <JSONSchemaType[]>Utils.makeArray<JSONSchemaType>(schema.type)
      .filter(type => type !== JSONSchemaType.NULL);
    const types = value ? baseTypes.concat(JSONSchemaType.NULL) : baseTypes;
    return cloneWith<T>(schema, { type: types.length > 1 ? types : types[0] } as any);
  }

  throw new Error(`Cannot make a non typed schema nullable.`);
}