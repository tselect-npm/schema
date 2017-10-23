import * as Schema from '../../';

describe('string()', function () {
  it('should create a string schema with no options', () => {
    const schema = Schema.string();
    expect(schema).to.deep.equal({
      type: 'string'
    });
  });

  it('should create a nullable string schema', () => {
    const schema = Schema.string({ nullable: true });
    expect(schema).to.deep.equal({
      type: ['string', 'null']
    });
  });

  it('should create a string schema with all options', () => {
    const schema = Schema.string({
      maxLength: 20,
      minLength: 10,
      pattern: '^\\d+$',
      format: Schema.JSONStringFormat.DATE_TIME
    });

    expect(schema).to.deep.equal({
      type: 'string',
      maxLength: 20,
      minLength: 10,
      pattern: '^\\d+$',
      format: 'date-time'
    });
  });
});