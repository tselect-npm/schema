import { expect } from 'chai';
import * as Schema from '../../src/';

describe('date()', function () {
  it('should create a date schema with no options', () => {
    const schema = Schema.date();
    expect(schema).to.deep.equal({
      type: 'string',
      format: 'date'
    });
  });
  it('should create a nullable date schema', () => {
    const schema = Schema.date({ nullable: true });
    expect(schema).to.deep.equal({
      type: ['string', 'null'],
      format: 'date'
    });
  });
});
