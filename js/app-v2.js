/*
 * Gets data using axios with promises and fetching errors
 * Requires axios-http.com
 */
const url = 'https://larnu-dev-upy5mhs63a-rj.a.run.app/api/v1/categories';

/*
 * Axios used as a promise
 */
const getResource = async () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((returnedData) => {
        resolve(returnedData.data.communityCategories);
      })
      .catch((error)=> {
        reject(error);
      });
  });
}

/*
 * Populate the container with data
 */
const render = (data) => {
  const container = document.querySelector('.container-cards');

  for (i = 0; i < data.length; i++) {
    container.innerHTML += `
    <div class="card">
      <div class="card-image">
        <img class="card-image--background" src="${
          data[i].background ||
          'https://storage.googleapis.com/bucket-larnu/media/business/153/images/BO64E73I.png'
        }" alt="${data[i].name}">
        <img class="card-image--icon" src="${data[i].icon}" alt="${data[i].name}">
      </div>
      <div class="card-content">
        <h3 class="card-title">${data[i].name}</h3>
        <p class="card-text">Total Quizzes: ${data[i].totalQuizzes}</p>
        <p class="card-text">User: ${data[i].users}</p>
        <a href="https://larnu.app/" target="_blank" class="btn btn-primary">Go to LarnU</a>
      </div>
    </div>
    `;
  };
};

// First implemetation kind using Promises
async function main() {
  getResource()
    .then((data) => {
      render(data);
    });
};

window.onload = main;
