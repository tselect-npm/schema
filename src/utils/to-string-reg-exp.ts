export function toStringRegExp(regExp: RegExp): string {
  const literal = regExp.toString();
  const lastSlashIndex = literal.lastIndexOf('/');

  if (lastSlashIndex !== literal.length - 1) {
    throw new Error(`Inline modifiers are not supported by JSON schema.`);
  }

  return literal.replace(/^\//, '').replace(/\/$/, '');
}
