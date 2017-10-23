import * as Schema from '../../';

describe('tuple()', function () {
  it('should create a tuple schema with no options', () => {
    const schema = Schema.tuple([Schema.string(), Schema.integer()]);
    expect(schema).to.deep.equal({
      type: 'array',
      items: [{ type: 'string' }, { type: 'integer' }],
      additionalItems: false
    });
  });
  it('should create a nullable tuple schema', () => {
    const schema = Schema.tuple([Schema.string(), Schema.integer()], { nullable: true });
    expect(schema).to.deep.equal({
      type: ['array', 'null'],
      items: [{ type: 'string' }, { type: 'integer' }],
      additionalItems: false
    });
  });
});