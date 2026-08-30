import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('isJSONSchemaLike()', function () {
  it('should return true for a simple object JSONSchema', () => {
    const schema = Schema.object({
      foo: Schema.string()
    }, {
      required: ['foo'],
      additionalProperties: true
    });

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an allOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.allOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an anyOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.anyOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });

  it('should return true for an oneOf JSONSchema', () => {
    const schemaOne = Schema.object({ foo: Schema.string() });
    const schemaTwo = Schema.object({ bar: Schema.string() });
    const schema = Schema.oneOf([schemaOne, schemaTwo]);

    const actual = Schema.isJSONSchemaLike(schema);
    expect(actual).toEqual(true);
  });
});
