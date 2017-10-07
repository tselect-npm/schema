import { Schema } from '../../';

describe('number()', function () {
  it('should create a number schema without options', () => {
    const schema = Schema.number();
    expect(schema).to.deep.equal({ type: 'number' });
  });

  it('should create a nullable number schema', () => {
    const schema = Schema.number({ nullable: true });
    expect(schema).to.deep.equal({ type: ['number', 'null'] });
  });

  it('should create a number schema will all options', () => {
    const schema = Schema.number({
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
    expect(schema).to.deep.equal({
      type: 'number',
      multipleOf: 1,
      minimum: 0,
      maximum: 2,
      exclusiveMinimum: true,
      exclusiveMaximum: true
    });
  });
});