import checkPicture from './utils/checkPicture';

fetch('index.json')
  .then((response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    tests(data);
  }).catch(function(error) {
    console.error(error);
});

function tests(data) {
  data.forEach((image) => {
    if (image.id && image.tests) {
      console.log(`id and test for ${image.id}`);
      checkPicture(image.id, image.tests);
    }
  });
}

