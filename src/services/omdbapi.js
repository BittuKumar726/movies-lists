const omdbApiUrl = "https://www.omdbapi.com";
const API_KEY = "841a04a5";

export const omdbApiByTitle = async (title) => {
  const response = await fetch(`${omdbApiUrl}/?s=${title}&apikey=${API_KEY}`);
  return response;
};

export const omdbApiById = async (id) => {
  const response = await fetch(`${omdbApiUrl}/?i=${id}&apikey=${API_KEY}`);
  return response;
};
