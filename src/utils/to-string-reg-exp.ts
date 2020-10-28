export function toStringRegExp(regExp: RegExp): string {
  const toString = regExp.toString();
  const lastSlashIndex = toString.lastIndexOf('/');

  if (lastSlashIndex !== toString.length - 1) {
    throw new Error(`Inline modifiers are not supported by JSON schema.`);
  }

  return toString
    .replace(/^\//, '')
    .replace(/\/$/, '');
}
