import * as Schema from '../../';

describe('enumeration()', function () {
  it('should create an enumeration schema from a string enum', () => {
    enum Foo { A = 'a', B = 'b' }
    const schema = Schema.enumeration(Foo);
    expect(schema).to.deep.equal({
      type: ['string'],
      enum: ['a', 'b']
    });
  });
  it('should create an enumeration schema from a mixed array', () => {
    const schema = Schema.enumeration([1, 'two', null]);
    expect(schema).to.deep.equal({
      type: ['number', 'string', 'null'],
      enum: [1, 'two', null]
    });
  });
  it('should throw for an unsupported type', () => {
    expect(() => Schema.enumeration([new Date()])).to.throw(/unsupported/i);
  });
});