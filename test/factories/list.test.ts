import * as Schema from '../../';

describe('list()', function () {
  it('should create a list schema with no options', () => {
    const schema = Schema.list(Schema.string());
    expect(schema).to.deep.equal({
      type: 'array',
      items: { type: 'string' },
      additionalItems: false
    });
  });
  it('should create a nullable list schema', () => {
    const schema = Schema.list(Schema.string(), { nullable: true });
    expect(schema).to.deep.equal({
      type: ['array', 'null'],
      items: { type: 'string' },
      additionalItems: false
    });
  });
});