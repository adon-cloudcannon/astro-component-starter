/**
 * Who wrote a post, as a list.
 *
 * `authors` is the list the ported posts carry — four of them name two people.
 * `author` is the single name a starter post is written with, and stays
 * supported so a new post needs only the one field.
 */
export function postAuthors(data) {
  const list = Array.isArray(data?.authors) ? data.authors.filter(Boolean) : [];

  if (list.length) return list;

  return data?.author ? [data.author] : [];
}
