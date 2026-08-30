import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('mergeWith()', function () {
  it('should return a merged object schema', () => {
    const fooSchema = Schema.object({
      foo: Schema.string()
    }, {
      required: ['foo'],
      additionalProperties: true
    });

    const barSchema = Schema.object({
      bar: Schema.string()
    }, {
      required: ['bar'],
      additionalProperties: true,
      nullable: true
    });

    const merged = Schema.mergeWith(fooSchema, barSchema);

    expect(merged).toEqual({
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
