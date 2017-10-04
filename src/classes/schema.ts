import * as AJV from 'ajv';
import { TSchemaValidateOptions } from '../types/schema-validate-options';


export abstract class Schema<JS> {
  private jsonSchema: JS;

  public constructor(jsonSchema: JS) {

  }

  public toJSON(): JS {
    return this.jsonSchema;
  }

  public async validate(value: any, options: TSchemaValidateOptions) {
    const ajv = new AJV(options);
    await ajv.compileAsync(this.jsonSchema);

  }

  public toString(replacer?: (number | string)[] | null, space?: string | number): string {
    return JSON.stringify(this.toJSON(), replacer, space);
  }
}