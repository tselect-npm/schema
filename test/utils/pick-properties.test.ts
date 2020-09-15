import { expect } from 'chai';
import * as Schema from '../../src/';

describe('pickProperties()', function () {
  it('should return a cloned object schema with filtered properties', () => {
    const schema = Schema.object({ foo: Schema.string(), bar: Schema.string() }, {
      required: ['foo'],
      additionalProperties: true
    });
    const modified = Schema.pickProperties(schema, ['bar']);
    expect(modified).to.deep.equal({
      type: 'object',
      required: [],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' }
      }
    });
  });
});
