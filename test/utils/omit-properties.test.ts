import { expect } from 'chai';
import * as Schema from '../../src/';

describe('omitProperties()', function () {
  it('should return a cloned object schema with filtered properties', () => {
    const schema = Schema.object({ foo: Schema.string(), bar: Schema.string() }, {
      required: ['bar'],
      additionalProperties: true
    });
    const modified = Schema.omitProperties(schema, ['bar']);
    expect(modified).to.deep.equal({
      type: 'object',
      additionalProperties: true,
      required: [],
      properties: {
        foo: { type: 'string' }
      }
    });
  });
});
