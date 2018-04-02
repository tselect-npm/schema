import { TJSONSchema } from '../types/json-schema';
import { JSONSchemaType } from '../constants/json-schema-type';
import * as Utils from '@bluejay/utils';
import { cloneWith } from './clone-with';

export function nullable<T extends TJSONSchema = TJSONSchema>(schema: T, value = true): T {
  if (schema.type) {
    const baseTypes = <JSONSchemaType[]>Utils.makeArray<JSONSchemaType>(schema.type)
      .filter(type => type !== JSONSchemaType.NULL);
    const types = value ? baseTypes.concat(JSONSchemaType.NULL) : baseTypes;
    if (schema.enum) {
      const enumValues = schema.enum.filter(type => type !== null);
      const newEnumValues = enumValues.concat(null);
      return cloneWith<T>(schema, { enum: newEnumValues, type: types.length > 1 ? types : types[0] } as any);
    } else {
      return cloneWith<T>(schema, { type: types.length > 1 ? types : types[0] } as any);
    }
  } else if (schema.anyOf) {
    const baseSchemas = schema.anyOf.filter(subSchema => subSchema.type !== JSONSchemaType.NULL);
    const Schemas = baseSchemas.concat({ type: JSONSchemaType.NULL });
    return cloneWith<T>(schema, { anyOf: Schemas } as any);
  } else if (schema.oneOf) {
    const baseSchemas = schema.oneOf.filter(subSchema => subSchema.type !== JSONSchemaType.NULL);
    const Schemas = baseSchemas.concat({ type: JSONSchemaType.NULL });
    return cloneWith<T>(schema, { oneOf: Schemas } as any);
  }

  throw new Error(`Cannot make a non typed schema nullable.`);
}