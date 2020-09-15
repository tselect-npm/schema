import { expect } from 'chai';
import * as Schema from '../../src/';

describe('boolean()', function () {
  it('should create a boolean schema with no options', () => {
    const schema = Schema.boolean();
    expect(schema).to.deep.equal({
      type: 'boolean'
    });
  });
  it('should create a nullable boolean schema', () => {
    const schema = Schema.boolean({ nullable: true });
    expect(schema).to.deep.equal({
      type: ['boolean', 'null']
    });
  });
});
