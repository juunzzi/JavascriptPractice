const API_KEY = `www.themealdb.com/api/json/v1/1/`;
export const SEARCH_KEY = `search.php?s=`;
export const RANDOM_SINGLE_KEY = `random.php`;
/**
 * @param {string} KEY API 세부 KEY
 * @param {string | undefined} keyword 검색의 경우 인자로 보내주어야하는 단어
 */
// async - await
export const fetcher = async (KEY, keyword = null) => {
  const url = `https://${API_KEY}${KEY}${keyword}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("삐용삐용 에러발생");
  }
  return await res.json();
};
