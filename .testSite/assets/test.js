const checkPicture = ({ divId, checks }) => {
  // results array
  const imgResults = [];
  const sourceResults = [];
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
              imgResults.push(
                `Classes of ${value.value} <span class="text-danger"><strong>FAIL</strong></span> (${missingClasses} not found)`
              );
            } else {
              imgResults.push(
                `Classes of ${value.value} <span class="text-success"><strong>PASS</strong></span>`
              );
            }
          } else if (value.prop === 'excludeClass') {
            const matchedClasses = [];
            value.value.forEach((className) => {
              // img fluid then lazyloaded
              classes = img.className.split(' ');
              const matches = classes.includes(className);
              if (matches === true) {
                matchedClasses.push(className);
              }
            });
            if (matchedClasses.length) {
              imgResults.push(
                `Exclude classes of ${value.value} <span class="text-danger"><strong>FAIL</strong></span> (${matchedClasses} found)`
              );
            } else {
              imgResults.push(
                `Exclude classes of ${value.value} <span class="text-success"><strong>PASS</strong></span>`
              );
            }
          } else {
            const propertyValue = img.getAttribute(value.prop);
            if (propertyValue) {
              if (propertyValue === value.value) {
                imgResults.push(
                  `${value.prop}="${value.value}" <span class="text-success"><strong>PASS</strong></span>`
                );
              } else {
                results.push(
                  `${value.prop}="${value.value}" <span class="text-danger"><strong>FAIL</strong></span> (${value.prop}="${propertyValue}")`
                );
              }
            } else {
              imgResults.push(
                `<span class="text-danger">Cannot find property ${value.prop}`
              );
            }
          }
        });
      }
    } else {
      imgResults.push(`cannot find <img> <picture id="${divId}">`);
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
                  sourceResults.push(
                    `cannot find type property in source tag #${count}`
                  );
                }
                count += 1;
              }
              if (value.value == sourceFormats) {
                sourceResults.push(
                  `Source formats of "${value.value}" <span class="text-success"><strong>PASS</strong></span>`
                );
              } else {
                sourceResults.push(
                  `Source formats of "${value.value}" <span class="text-danger"><strong>FAIL</strong></span> formats are "${sourceFormats}"`
                );
              }
            }
          }
        });
      }
    }
  } else {
    debug.push(`cannot find picture id="${divId}"`);
  }

  const resultsDiv = document.getElementById(`${divId}-results`);
  let imgResultsList = '';
  imgResults.forEach((value) => {
    imgResultsList += `<li>${value}</li>`;
  });
  let sourceResultsList = '';
  sourceResults.forEach(value => {
    sourceResultsList += `<li>${value}</li>`;
  })

  if (resultsDiv) {
    if (imgResultsList) {
      resultsDiv.innerHTML += `
      Img tag:
      <ul>
        ${imgResultsList}
      </ul>
      `;
    }
    if (sourceResultsList) {
      resultsDiv.innerHTML += `
      Source tags:
      <ul>
        ${sourceResultsList}
      </ul>
      `;
    }
   
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
      { prop: 'data-sizes', value: 'auto' },
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

checkPicture({
  divId: 'js-test4',
  checks: {
    img: [
      { prop: 'loading', value: 'auto' },
      { prop: 'sizes', value: '50vw' },
      { prop: 'class', value: ['img-fluid'] },
      { prop: 'excludeClass', value: ['lazysizes'] },
    ],
  },
});

checkPicture({
  divId: 'js-test5',
  checks: {
    img: [
      { prop: 'loading', value: 'auto' },
      { prop: 'data-sizes', value: 'auto' },
      { prop: 'class', value: ['img-fluid', 'lazyload'] },
    ],
  },
});

checkPicture({
  divId: 'js-test6',
  checks: {
    img: [
      { prop: 'loading', value: 'lazy' },
      { prop: 'data-sizes', value: 'auto' },
      { prop: 'class', value: ['img-fluid', 'lazyload'] },
    ],
  },
});
