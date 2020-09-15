import { expect } from 'chai';
import * as Schema from '../../src/';
import * as AJV from 'ajv';

const ajv = new AJV();

describe('object()', function () {
  it('should create an object schema with no options', () => {
    const schema = Schema.object({ foo: Schema.string() });
    expect(schema).to.deep.equal({
      type: 'object',
      additionalProperties: false,
      properties: {
        foo: {
          type: 'string'
        }
      }
    });
  });
  it('should create a nullable object schema', () => {
    const schema = Schema.object<{ foo: string }>({ foo: Schema.string() }, {
      nullable: true
    });
    expect(() => ajv.compile(schema)).to.not.throw();
    expect(schema).to.deep.equal({
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        foo: {
          type: 'string'
        }
      }
    });
  });
  it('should create an object schema with all options', () => {
    const schema = Schema.object({ foo: { $ref: '#/definitions/foo' } }, {
      maxProperties: 1,
      minProperties: 2,
      required: ['foo'],
      additionalProperties: true,
      definitions: { foo: Schema.string() },
      patternProperties: { 'foo[a-z]*': Schema.string() }
    });
    expect(() => ajv.compile(schema)).to.not.throw();
    expect(schema).to.deep.equal({
      type: 'object',
      properties: {
        foo: { $ref: '#/definitions/foo' }
      },
      maxProperties: 1,
      minProperties: 2,
      required: ['foo'],
      additionalProperties: true,
      definitions: { foo: { type: 'string' } },
      patternProperties: { 'foo[a-z]*': { type: 'string' } }
    });
  });
});
