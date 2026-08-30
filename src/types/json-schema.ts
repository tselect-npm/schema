import type { JSONSchemaType } from '../constants/json-schema-type';

export type TJSONSchema = {
  // `any`, not `unknown`, and deliberately so. This index signature is what
  // makes the type open to the whole of JSON Schema — every keyword this
  // package does not model by hand is reached through it, and every
  // `TJSONSchema & { ... }` intersection in `src/types` relies on it. Under
  // `unknown` a consumer reading `schema.minLength` would get `unknown` back
  // and have to narrow at every call site, which would be a break on the
  // package's most-used type for no correctness gain.
  // biome-ignore lint/suspicious/noExplicitAny: see above
  [key: string]: any;
  $ref?: string;
  id?: string;
  $schema?: string;
  /**
   * Title of the schema
   */
  title?: string;
  /**
   * Schema description
   */
  description?: string;
  /**
   * Default json for the object represented by
   * this schema
   */
  // A JSON Schema `default` is arbitrary JSON by definition. `unknown` here
  // would be inconsistent with the index signature above, which already hands
  // back `any` for every key this type does not name.
  // biome-ignore lint/suspicious/noExplicitAny: see above
  default?: any;

  /////////////////////////////////////////////////
  // Object Validation
  /////////////////////////////////////////////////

  /////////////////////////////////////////////////
  // Generic
  /////////////////////////////////////////////////
  /**
   * Enumerates the values that this schema can be
   * e.g.
   * {"type": "string",
   *  "enum": ["red", "green", "blue"]}
   */
  // As with `default`: enum members are arbitrary JSON values.
  // biome-ignore lint/suspicious/noExplicitAny: see above
  enum?: any[];
  /**
   * The basic type of this schema, can be one of
   * [string, number, object, array, boolean, null]
   * or an array of the acceptable types
   */
  type?: JSONSchemaType | JSONSchemaType[];

  allOf?: TJSONSchema[];
  anyOf?: TJSONSchema[];
  oneOf?: TJSONSchema[];
  not?: TJSONSchema;
};
