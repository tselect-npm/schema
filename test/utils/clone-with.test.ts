import * as Schema from '../../';

describe('cloneWith()', function () {
  it('should return a cloned object schema', () => {
    const schema = Schema.object({
      foo: Schema.string()
    }, {
      required: ['foo'],
      additionalProperties: true
    });

    const cloned = Schema.cloneWith(schema, Schema.object({ bar: Schema.string() }, {
      additionalProperties: true,
      nullable: true
    }));

    expect(cloned).to.deep.equal({
      type: ['object', 'null'],
      required: ['foo'],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' }
      }
    });
  });
});