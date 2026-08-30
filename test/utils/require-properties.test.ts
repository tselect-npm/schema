import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('requireProperties()', function () {
  it('should return a cloned schema', () => {
    const schema = Schema.object({ foo: Schema.string() });
    expect(Schema.requireProperties(schema, ['foo'])).not.toBe(schema);
  });
  it('should make properties required', () => {
    const schema = Schema.object({ foo: Schema.string() });
    const modified = Schema.requireProperties(schema, ['foo']);
    expect(modified).toEqual({
      type: 'object',
      additionalProperties: false,
      required: ['foo'],
      properties: {
        foo: { type: 'string' }
      }
    });
  });
  it('should merge new to existing properties', () => {
    const schema = Schema.object({ foo: Schema.string(), bar: Schema.string() }, { required: ['bar'] });
    const modified = Schema.requireProperties(schema, ['foo'], { preserveExisting: true });
    expect(modified).toEqual({
      type: 'object',
      additionalProperties: false,
      required: ['foo', 'bar'],
      properties: {
        foo: { type: 'string' },
        bar: { type: 'string' }
      }
    });
  });
  it('should not duplicate properties', () => {
    const schema = Schema.object({ foo: Schema.string() }, { required: ['foo'] });
    const modified = Schema.requireProperties(schema, ['foo']);
    expect(modified).toEqual({
      type: 'object',
      additionalProperties: false,
      required: ['foo'],
      properties: {
        foo: { type: 'string' }
      }
    });
  });
});
