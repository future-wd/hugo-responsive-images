const checkPicture = ({ divId, checks }) => {
  // results array
  const results = [];
  // debug header
  const debug = [];
  // get picture tag by id
  const div = document.getElementById(divId);
  if (div) {
    // get first img tag
    const img = div.getElementsByTagName('img')[0];
    if (img) {
      const imgChecks = checks.img;
      if (imgChecks) {
        imgChecks.forEach((value) => {
          if (value.prop === 'class') {
            const missingClasses = [];
            value.value.forEach((className) => {
              // img fluid then lazyloaded
              classes = img.className.split(' ');
              const found = classes.includes(className);
              if (found === false) {
                missingClasses.push(className);
              }
            });
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
      }
    } else {
      results.push(`cannot find <img> <picture id="${divId}">`);
    }
    // get sources
    sourceCheck = checks.source;
    if (sourceCheck) {
      const sources = div.getElementsByTagName('source');
      if (sources) {
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
                  results.push(
                    `cannot find type property in source tag #${count}`
                  );
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
            debug.push(' no type value in config');
          }
        });
      }
    }
  } else {
    results.push(`cannot find picture id="${divId}"`);
  }

  const resultsDiv = document.getElementById(`${divId}-results`);
  let resultsList = '';
  results.forEach((value) => {
    resultsList += `<li>${value}</li>`;
  });

  if (resultsDiv) {
    resultsDiv.innerHTML = `
    Img tag:
    <ul>
      ${resultsList}
    </ul>
    `;
  } else {
    debug.push(`cannot find &lt;div id="${divId}-results"&gt;`);
  }

  const debugDiv = document.getElementById('js-debug');

  if (debugDiv) {
    let debugList = '';
    debug.forEach((value) => {
      debugList += `<li>${value}</li>`;
    });

    debugDiv.innerHTML = `
    <ul>
      ${debugList}
    </ul>
    `;
  }
};

checkPicture({
  divId: 'js-test1',
  checks: {
    img: [
      { prop: 'data-sizes', value: 'auto' },
      { prop: 'alt', value: 'Test Image Alt' },
      { prop: 'title', value: 'Test Image Title' },
      { prop: 'class', value: ['img-fluid', 'lazyload'] },
    ],
    source: [{ prop: 'types', value: ['webp', 'jpeg'] }],
  },
});

checkPicture({
  divId: 'js-test2',
  checks: {
    img: [],
    source: [{ prop: 'types', value: ['webp', 'png', 'jpeg'] }],
  },
});
checkPicture({
  divId: 'js-test3',
  checks: {
    img: [{ prop: 'width', value: 400 }],
  },
});

// checkPicture({
//   pictureId: 'js-picture3',
//   resultsId: 'js-picture3-results',
//   checks: {
//     img: [
//       { prop: 'sizes', value: '50vw' },
//       { prop: 'alt', value: 'test image' },
//       { prop: 'title', value: 'image title' },
//       { prop: 'loading', value: 'lazy'},
//       { prop: 'class', value: ['img-fluid', 'lazyload'] },
//     ],
//     source: [{ prop: 'types', value: ['webp', 'jpeg'] }],
//   },
// });
