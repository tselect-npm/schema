import { Schema } from '../../';

describe('requireProperties()', function () {
  it('should return a cloned schema', () => {
    const schema = Schema.object({ foo: Schema.string() });
    expect(Schema.requireProperties(schema, ['foo'])).to.not.equal(schema);
  });
  it('should make properties required', () => {
    const schema = Schema.object({ foo: Schema.string() });
    const modified = Schema.requireProperties(schema, ['foo']);
    expect(modified).to.deep.equal({
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
    expect(modified).to.deep.equal({
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
    expect(modified).to.deep.equal({
      type: 'object',
      additionalProperties: false,
      required: ['foo'],
      properties: {
        foo: { type: 'string' }
      }
    });
  });
});