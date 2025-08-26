export async function searchBooks(query = "", filters = {}, page = 1, limit = 20) {
  const params = new URLSearchParams();

  if (query) params.append("title", query);
  if (filters.author) params.append("author", filters.author);
  if (filters.publisher) params.append("publisher", filters.publisher);
  if (filters.subject) params.append("subject", filters.subject);
  if (filters.year) params.append("first_publish_year", filters.year);

  params.append("page", page);
  params.append("limit", limit);

  const url = `https://openlibrary.org/search.json?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  const ans=res.json();
  return ans;
}
