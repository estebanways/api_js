/*
 * Fetch Errors
 * Only throws an error if cannot resolve.
 * Error Response still a response (400-500)
 *
 */

const url = 'https://larnu-dev-upy5mhs63a-rj.a.run.app/api/v1/categories';

const getData = async () => {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const msg = `There was an error "${resp.status} ${resp.statusText}"`;
      throw new Error(msg);
    }

    const allData = await resp.json();
    console.log(allData);
    console.log(allData.communityCategories);

    //the data to retrieve from/through the API
    const data = allData.communityCategories;

    /*
     * getElement-helper
     * Use this code to verify queries to HTML classes
     * in the query and in the last console.log
     *
     */
    //const container = document.querySelector('.container-cards');
    // console.log(.container-cards);

    const getElement = (selector, isList) => {
      const el = isList
        ? [...document.querySelectorAll(selector)]
        : document.querySelector(selector);

      if ((!isList && el) || (isList && !el.length < 1)) return el;
      throw new Error(`Please double check selector : ${selector}`);
    };

    // Use 'true' for the second argument, so selecting a list
    //console.log(getElement('.list-item', true));

    console.log(getElement('.container-cards'));

    /*
     * Populate the container with data
     * Do not use forEach with async-await:
     * https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971?permalink_comment_id=3936799
     */
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

  } catch (error) {
    console.log(error);
  }
};

// This logs errors when the app gets from the API on page load
function main() {
  console.log('On loading ...');
  getData();
};

window.onload = main;
