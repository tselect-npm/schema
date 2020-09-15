import { expect } from 'chai';
import * as Schema from '../../src/';

describe('integer()', function () {
  it('should create an integer schema with no options', () => {
    const schema = Schema.integer();
    expect(schema).to.deep.equal({ type: 'integer' });
  });
  it('should create a nullable integer schema', () => {
    const schema = Schema.integer({ nullable: true });
    expect(schema).to.deep.equal({ type: ['integer', 'null'] });
  });
  it('should create an integer schema with all options', () => {
    const schema = Schema.integer({
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
    expect(schema).to.deep.equal({
      type: 'integer',
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
  });
});
