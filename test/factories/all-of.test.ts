import * as Schema from '../../index';
import { JSONSchemaType } from '../../src/constants/json-schema-type';

describe('allOf()', () => {
  it('should return an untyped allOf', () => {
    expect(Schema.allOf([
      { type: 'integer' as JSONSchemaType },
      { type: 'string' as JSONSchemaType },
    ])).to.deep.equal({
      allOf: [{
        type: 'integer',
      }, {
        type: 'string',
      }]
    });
  });
});