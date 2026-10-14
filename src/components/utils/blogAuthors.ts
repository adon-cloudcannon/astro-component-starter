import { getCollection, type CollectionEntry } from "astro:content";

/**
 * The authors collection, keyed by the name a post writes in its `authors`
 * list. A name with no entry resolves to nothing rather than throwing, so a
 * post that names someone the collection has never heard of still renders.
 */
export async function loadAuthorsByName(): Promise<Map<string, CollectionEntry<"authors">>> {
  const authors = await getCollection("authors");

  return new Map(authors.map((author) => [author.data.name, author]));
}
