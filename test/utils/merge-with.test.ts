import * as Schema from '../../';

describe('mergeWith()', function () {
  it('should return a merged object schema', () => {
    const schema = Schema.object({
      foo: Schema.string()
    }, {
      required: ['foo'],
      additionalProperties: true
    });

    const merged = Schema.mergeWith(schema, Schema.object({
      bar: Schema.string()
    }, {
      required: ['bar'],
      additionalProperties: true,
      nullable: true
    }));

    expect(merged).to.deep.equal({
      type: ['object', 'null'],
      required: ['foo', 'bar'],
      additionalProperties: true,
      properties: {
        foo: { type: 'string' },
        bar: { type: 'string' }
      }
    });
  });
});