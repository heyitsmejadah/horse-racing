console.log("Hello Bitchez");

const button = document.querySelector("#search-button");
const title = document.querySelector("#title");
const userInput = document.querySelector("#search-input");

button.addEventListener("submit", (ev) => {
  ev.preventDefault();
  console.log("Button clicked", ev.target.name);
  getApi(userInput.value).then(movieInfo);
});

const apiUrl = "https://api.themoviedb.org/3/search/movie";
const apiToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjk4M2JmODc1M2M4MzU4ZDlkNzg0ZmYyMWE4MzU0MSIsInN1YiI6IjY1YzQ1MjgzZjQ5NWVlMDE5NzBiZWQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K-Ij_X2e0aEMx7u84KGspaD67OcfXw_bTmg-BvGe5N4";
const defaultParam = "?include_adult=false&language=en-US&page=1";

async function getApi(query) {
  return fetch(`${apiUrl}${defaultParam}&query=${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .then((data) => {
      return data.results.map((movie) => {
        return {
          title: movie.original_title,
          description: movie.overview,
        };
      });
    });
}

function movieInfo (results) {
  title.innerHTML = "";
  for (const el of results) {
    console.log(el);
    const listItem = document.createElement("li");
    listItem.textContent = el.title;
    title.appendChild(listItem);
  }
}
