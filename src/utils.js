/* eslint-disable import/prefer-default-export */
export function makeSlug(string) {
  return string.replace(/\s+/g, '-').toLowerCase()
}
