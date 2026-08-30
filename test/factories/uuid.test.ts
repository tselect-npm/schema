import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';
import Ajv, { type ValidateFunction } from 'ajv';

// ajv 8 enables strict mode by default; `nullable` schemas are union-typed.
const ajv = new Ajv({ allowUnionTypes: true });

describe('uuid()', function () {
  it('should create an uuid schema with no options', () => {
    const schema = Schema.uuid();
    expect(schema).toEqual({
      type: 'string',
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    });
  });
  it('should accept a valid uuid', () => {
    const schema = Schema.uuid();

    const validateFunction: ValidateFunction = ajv.compile(schema);
    const data = '00000000-0000-0000-0000-000000000000';
    const valid = validateFunction(data);

    expect(valid).toBe(true);
  });
  it('should reject an invalid uuid', () => {
    const schema = Schema.uuid();

    const validateFunction: ValidateFunction = ajv.compile(schema);
    const data = 'not-a-uuid-lol';
    const valid = validateFunction(data);

    expect(valid).toBe(false);
  });
});
