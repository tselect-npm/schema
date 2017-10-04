import { Options as AJVOptions } from 'ajv';

export type TSchemaValidateOptions = AJVOptions & {
  required?: string[];
  nullable?: string[];
};