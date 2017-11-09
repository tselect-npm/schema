import * as Schema from '../../index';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('anyOf()', () => {
  it('should return an untyped anyOf', () => {
    expect(Schema.anyOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).to.deep.equal({
      anyOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});