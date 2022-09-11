import checkPicture from './utils/checkPicture';

fetch('index.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    tests(data);
  });

function tests(data) {
  data.forEach((image) => {
    if (image.id && image.tests) {
      checkPicture(image.id, image.tests);
    }
  });
}

