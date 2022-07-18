/*
 * Desc: Get data using axios with promises
 * Requires: axios-http.com
 *
 * Fetch Errors
 * Only throws an error if cannot resolve.
 * Error Response still a response (400-500)
 */

// This example will log error
//const url = 'https://www.course-api.com/react-tours-projects';

const url = 'https://larnu-dev-upy5mhs63a-rj.a.run.app/api/v1/categories';

const getData = async () => {
  try {
    const resp = await axios.get(url);
    console.log('Resp: ', resp);
    console.log('Resp.ok : ', resp.ok);
    console.log('Resp.data: ', resp.data);
    console.log('Resp.data.communityCategories', resp.data.communityCategories);
    console.log('Resp.status:', resp.status);
/*
  } catch (error) {
    console.log(error);
  }
};
*/

    /*
     * Populate the container with data
     * Do not use forEach with async-await:
     * https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971?permalink_comment_id=3936799
     */
    const render = async () => {
      const container = document.querySelector('.container-cards');
      const data = resp.data.communityCategories;

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

    render();

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
