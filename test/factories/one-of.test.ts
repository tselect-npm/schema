import { expect } from 'chai';
import * as Schema from '../../src/';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('oneOf()', () => {
  it('should return an untyped oneOf', () => {
    expect(Schema.oneOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).to.deep.equal({
      oneOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});
