import { describe, expect, it } from 'vitest';
import { JSONSchemaType } from '../../src/constants/json-schema-type';
import * as Schema from '../../src/index';

describe('cleanOptions()', () => {
  // Also a compile-time guard. Before the parameter was widened from
  // `TCommonOptions` to `TOptions<TJSONSchema>` this object literal failed
  // excess property checking on `title`, which made the function impossible to
  // call directly with anything but `nullable`.
  it('should strip nullable and keep every other key', () => {
    expect(Schema.cleanOptions({ nullable: true, title: 'T', minLength: 1 })).toEqual({
      title: 'T',
      minLength: 1,
    });
  });

  it('should apply overrides over the cleaned options', () => {
    expect(Schema.cleanOptions({ nullable: true, title: 'T' }, { type: JSONSchemaType.STRING })).toEqual({
      title: 'T',
      type: 'string',
    });
  });

  it('should not mutate the options it is given', () => {
    const options = { nullable: true, title: 'T' };

    Schema.cleanOptions(options);

    expect(options).toEqual({ nullable: true, title: 'T' });
  });
});
