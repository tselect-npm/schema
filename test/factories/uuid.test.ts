import { expect } from 'chai';
import * as Schema from '../../src/';
import * as AJV from 'ajv';
import { ValidateFunction } from 'ajv';

const ajv = new AJV();

describe('uuid()', function () {
  it('should create an uuid schema with no options', () => {
    const schema = Schema.uuid();
    expect(schema).to.deep.equal({
      type: 'string',
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    });
  });
  it('should accept a valid uuid', () => {
    const schema = Schema.uuid();

    const validateFunction: ValidateFunction = ajv.compile(schema);
    const data = '00000000-0000-0000-0000-000000000000';
    const valid = validateFunction(data);

    expect(valid).to.equal(true);
  });
  it('should reject an invalid uuid', () => {
    const schema = Schema.uuid();

    const validateFunction: ValidateFunction = ajv.compile(schema);
    const data = 'not-a-uuid-lol';
    const valid = validateFunction(data);

    expect(valid).to.equal(false);
  });
});
