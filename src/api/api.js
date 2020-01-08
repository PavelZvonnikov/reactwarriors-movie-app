export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "39238f07468d13f33d97dbc070a08c98";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTIzOGYwNzQ2OGQxM2YzM2Q5N2RiYzA3MGEwOGM5OCIsInN1YiI6IjVkZmRkYTRmZDIzNmU2MDAxMjhiZjMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFulm_gaOlqtPcHENXt2x4b0ujtVzP4rRpkVxAx9PY8";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};
