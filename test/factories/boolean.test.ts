import { describe, expect, it } from 'vitest';
import * as Schema from '../../src/index';

describe('boolean()', function () {
  it('should create a boolean schema with no options', () => {
    const schema = Schema.boolean();
    expect(schema).toEqual({
      type: 'boolean'
    });
  });
  it('should create a nullable boolean schema', () => {
    const schema = Schema.boolean({ nullable: true });
    expect(schema).toEqual({
      type: ['boolean', 'null']
    });
  });
});
