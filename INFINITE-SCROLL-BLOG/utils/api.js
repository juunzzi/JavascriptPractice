const API_END_POINT = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=`;
export const getPostsByPageId = async (pageID) => {
  try {
    const res = await fetch(`${API_END_POINT}${pageID}`);
    if (!res.ok) {
      throw new Error("server 에러입니다");
    }
    return await res.json();
  } catch (e) {
    throw new Error("에러발생");
  }
};
