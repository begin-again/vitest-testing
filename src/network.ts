export async function getPostBody(id: number) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const data = await fetch(url).then((r) => r.json());

  return data.body;
}
