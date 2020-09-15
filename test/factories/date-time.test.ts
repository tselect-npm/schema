import { expect } from 'chai';
import * as Schema from '../../src/';

describe('dateTime()', function () {
  it('should create a date time schema with no options', () => {
    const schema = Schema.dateTime();
    expect(schema).to.deep.equal({
      type: 'string',
      format: 'date-time'
    });
  });
  it('should create a nullable date time schema', () => {
    const schema = Schema.dateTime({ nullable: true });
    expect(schema).to.deep.equal({
      type: ['string', 'null'],
      format: 'date-time'
    });
  });
});
