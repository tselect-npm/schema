import { JSONSchemaType } from '../constants/json-schema-type';

export type TJSONSchema = {
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