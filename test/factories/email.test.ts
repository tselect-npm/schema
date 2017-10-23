import * as Schema from '../../';

describe('email()', function () {
  it('should create an email schema with no options', () => {
    const schema = Schema.email();
    expect(schema).to.deep.equal({
      type: 'string',
      format: 'email'
    });
  });
  it('should create a nullable email schema', () => {
    const schema = Schema.email({ nullable: true });
    expect(schema).to.deep.equal({
      type: ['string', 'null'],
      format: 'email'
    });
  });
});