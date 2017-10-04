export type TJSONSchema = {
  $ref?: string;
  /////////////////////////////////////////////////
  // Schema Metadata
  /////////////////////////////////////////////////
  /**
   * This is important because it tells refs where
   * the root of the document is located
   */
  id?: string;
  /**
   * It is recommended that the meta-schema is
   * included in the root of any JSON Schema
   */
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
  type?: string | string[];

  allOf?: TJSONSchema[];
  anyOf?: TJSONSchema[];
  oneOf?: TJSONSchema[];
  not?: TJSONSchema;
};