/**
 * Replaces `{token}` placeholders (see the JSON copy files, e.g.
 * `"Select {name}"`). Unknown tokens are left untouched so a typo stays
 * visible instead of silently rendering empty.
 */
export function format(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (match, token: string) => values[token] ?? match,
  );
}
