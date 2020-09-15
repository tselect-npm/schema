import { expect } from 'chai';
import * as Schema from '../../src/';

describe('cloneWith()', function () {
  it('should return a cloned object schema', () => {
    const fooSchema = Schema.object({
      foo: Schema.string()
    }, {
      required: ['foo'],
      additionalProperties: true
    });

    const barSchema = Schema.object({ bar: Schema.string() }, {
      additionalProperties: true,
      nullable: true
    });

    const cloned = Schema.cloneWith(fooSchema, barSchema);

    expect(cloned).to.deep.equal({
      type: ['object', 'null'],
      required: ['foo'],
      additionalProperties: true,
      properties: {
        bar: { type: 'string' }
      }
    });
  });

  it('should return a cloned string schema', () => {
    const fooSchema = Schema.string({
      minLength: 3,
      maxLength: 15
    });

    const barSchema = Schema.string({
      minLength: 10,
      pattern: '[a-b]'
    });

    const cloned = Schema.cloneWith(fooSchema, barSchema);

    expect(cloned).to.deep.equal({
      type: 'string',
      maxLength: 15,
      minLength: 10,
      pattern: '[a-b]'
    });
  });
});
