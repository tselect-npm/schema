import { expect } from 'chai';
import * as Schema from '../../src/';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('nullable()', function () {
  it('should handle an anyOf JSONSchema', () => {
    const schema = Schema.anyOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ]);

    const actual = Schema.nullable(schema);

    expect(actual).to.deep.equal({
      anyOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }, {
        type: 'null',
      }]
    });
  });

  it('should handle an oneOf JSONSchema', () => {
    const schema = Schema.oneOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ]);

    const actual = Schema.nullable(schema);

    expect(actual).to.deep.equal({
      oneOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }, {
        type: 'null',
      }]
    });
  });

  it('should handle an enum JSONSchema', () => {
    const schema = Schema.enumeration(['foo', 'bar']);

    const actual = Schema.nullable(schema);

    expect(actual).to.deep.equal({
      enum: ['foo', 'bar', null],
      type: ['string', 'null']
    });
  });
});
