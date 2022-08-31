const checkPicture = ({ pictureId, resultsId, checks }) => {
  // results array
  const results = [];
  // get picture tag by id
  const picture = document.getElementById(pictureId);
  if (picture) {
    // get first img tag
    const img = picture.getElementsByTagName('img')[0];
    if (img) {
      checks['img'].forEach((value) => {
        if (value.prop === 'class') {
          const missingClasses = []
          value.value.forEach ((className) => {
            // img fluid then lazyloaded
            classes = img.className.split(' ');
            const found = classes.includes(className)
            if (found === false) {
              missingClasses.push(className)
            }
          })
          if (missingClasses.length) {
            results.push(
              `Classes of ${value.value} <span class="text-danger"><strong>FAIL</strong></span> (${missingClasses} not found)`
            );
          } else {
            results.push(
              `Classes of ${value.value} <span class="text-success"><strong>PASS</strong></span>`
            );
          }
        } else {
          const propertyValue = img.getAttribute(value.prop);
          if (propertyValue) {
            if (propertyValue === value.value) {
              results.push(
                `${value.prop}="${value.value}" <span class="text-success"><strong>PASS</strong></span>`
              );
            } else {
              results.push(
                `${value.prop}="${value.value}" <span class="text-danger"><strong>FAIL</strong></span> (${value.prop}="${propertyValue}")`
              );
            }
          } else {
            results.push(
              `<span class="text-danger">Cannot find property ${value.prop}`
            );
          }
        }
      });
    } else {
      results.push(`cannot find <img> <picture id="${pictureId}">`);
    }
    // get sources
    const sources = picture.getElementsByTagName('source');
    checks.source.forEach((value) => {
      // if types is passed
      if (value.prop === 'types') {
        if (sources) {
          const sourceFormats = [];
          let count = 1;
          for (const source of sources) {
            const typeValue = source.getAttribute('type');
            if (typeValue) {
              // remove 'image/' from type
              const imageType = typeValue.slice(6);
              sourceFormats.push(imageType);
            } else {
              results.push(`cannot find type property in source tag #${count}`);
            }
            count += 1;
          }
          if (value.value === sourceFormats) {
            results.push(
              `Source formats of ${value.value} <span class="text-success"><strong>PASS</strong></span>`
            );
          } else {
            results.push(
              `Source formats of ${value.value} <span class="text-danger"><strong>FAIL</strong></span> formats are ${sourceFormats}`
            );
          }
        }
      } else {
        alert(' no type value in config');
      }
    });
  } else {
    results.push(`cannot find <picture id="${pictureId}">`);
  }

  const resultsDiv = document.getElementById(resultsId);
  let resultsList = '';
  results.forEach((value) => {
    resultsList += `<li>${value}</li>`;
  });
  // const resultsList = results.map(value => {
  //   `<li>${value}</li>`
  // })

  if (resultsDiv) {
    resultsDiv.innerHTML = `
    Img tag:
    <ul>
      ${resultsList}
    </ul>
    `;
  } else {
    alert('cannot find <div id="${resultsId}"');
  }
};

checkPicture({
  pictureId: 'js-picture1',
  resultsId: 'js-picture1-results',
  checks: {
    img: [
      { prop: 'sizes', value: '50vw' },
      { prop: 'alt', value: 'test image' },
      { prop: 'title', value: 'image title' },
      { prop: 'class', value: ['img-fluid', 'lazyload'] },
    ],
    source: [{ prop: 'types', value: ['webp', 'jpeg'] }],
  },
});

checkPicture({
  pictureId: 'js-picture3',
  resultsId: 'js-picture3-results',
  checks: {
    img: [
      { prop: 'sizes', value: '50vw' },
      { prop: 'alt', value: 'test image' },
      { prop: 'title', value: 'image title' },
      { prop: 'loading', value: 'lazy'},
      { prop: 'class', value: ['img-fluid', 'lazyload'] },
    ],
    source: [{ prop: 'types', value: ['webp', 'jpeg'] }],
  },
});
