import * as AJV from 'ajv';
import * as Lodash from 'lodash';
import { Ajv as IAjv, Options as AJVOptions } from 'ajv';
import { TSchemaValidateOptions } from '../types/schema-validate-options';
import { TJSONSchema } from '../types/json-schema';

const ajvCache: Map<string, IAjv> = new Map();

function toAJVOptions(options: TSchemaValidateOptions): AJVOptions {
  return Lodash.omit(options, ['required', 'nullable']);
}

export function validatorFactory(schema: TJSONSchema, options: TSchemaValidateOptions) {

}