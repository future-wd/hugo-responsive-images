const checkPicture = (divId, checks) => {
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
      // check if img key exists
      const imgChecks = checks.img;
      if (imgChecks) {
        for (key in imgChecks) {
          // if class prop exists
          if (key === 'class') {
            const missingClasses = [];
            const checkClasses = imgChecks[key];
            checkClasses.forEach((className) => {
              // img fluid then lazyloaded
              // ... to spread HTML collection into array
              classes = [...img.classList];
              const found = classes.includes(className);
              if (found === false) {
                missingClasses.push(className);
              }
            });
            if (missingClasses.length) {
              imgResults.push(
                `Classes of ${checkClasses} <span class="text-danger"><strong>FAIL</strong></span> (${missingClasses} not found)`
              );
            } else {
              imgResults.push(
                `Classes of ${checkClasses} <span class="text-success"><strong>PASS</strong></span>`
              );
            }
          } else if (key === 'notClass') {
            const matchedClasses = [];
            const checkNotClasses = imgChecks[key];
            checkNotClasses.forEach((className) => {
              // ... to spread HTML collection into array
              classes = [...img.classList];
              const matches = classes.includes(className);
              if (matches === true) {
                matchedClasses.push(className);
              }
            });
            if (matchedClasses.length) {
              imgResults.push(
                `Not classes of ${checkNotClasses} <span class="text-danger"><strong>FAIL</strong></span> (${matchedClasses} found)`
              );
            } else {
              imgResults.push(
                `Not classes of ${checkNotClasses} <span class="text-success"><strong>PASS</strong></span>`
              );
            }
          } else {
            // convert camelCase to camel-case
            const dashKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
            // get attribute from img tag
            const propertyValue = img.getAttribute(dashKey);
            const value = imgChecks[key];
            if (propertyValue) {
              // == used as value.value is int, propertyValue is string
              if (propertyValue == value) {
                imgResults.push(
                  `${dashKey}="${value}" <span class="text-success"><strong>PASS</strong></span>`
                );
              } else {
                imgResults.push(
                  `${dashKey}="${value}" <span class="text-danger"><strong>FAIL</strong></span> (${dashKey}="${propertyValue}")`
                );
              }
            } else {
              imgResults.push(
                `<span class="text-danger">Cannot find property ${dashKey}`
              );
            }
          }
        }
      }
    } else {
      imgResults.push(`cannot find <img> <picture id="${divId}">`);
    }
    // get sources

    // ... to spread HTML collection into array
    const sources = [...div.getElementsByTagName('source')];
    if (sources) {
      sourceCheck = checks.source;
      if (sourceCheck) {
        //checks.source.forEach((value) => {
        for (key in sourceCheck) {
          // convert camelCase to camel-case
          const dashKey = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
          const value = sourceCheck[key];
          // if types is passed
          if (key === 'types') {
            const sourceFormats = [];
            sources.forEach((source, index) => {
              const typeValue = source.getAttribute('type');
              if (typeValue) {
                // remove 'image/' from type
                const imageType = typeValue.slice(6);
                sourceFormats.push(imageType);
              } else {
                sourceResults.push(
                  `cannot find type property in source tag #${index + 1}`
                );
              }
            });
            // convert objects to strings for easy comparison
            if (value.toString == sourceFormats.toString) {
              sourceResults.push(
                `Source formats of "${value}" <span class="text-success"><strong>PASS</strong></span>`
              );
            } else {
              sourceResults.push(
                `Source formats of "${value}" <span class="text-danger"><strong>FAIL</strong></span> formats are "${sourceFormats}"`
              );
            }
          } else if (dashKey === 'densities' || 'data-densities') {
            let set;
            dashKey === 'densities' ? (set = 'srcset') : (set = 'data-srcset');
            sources.forEach((source, index) => {
              const srcset = source.getAttribute(set);
              if (srcset) {
                const patternArray = value.map(
                  (value) => `(?=.*\\b${value}\\b)`
                );
                const patternString = patternArray.join('');
                const regexp = new RegExp(patternString);
                let result = regexp.test(srcset);
                if (result === true) {
                  sourceResults.push(
                    `Densities of ${value} in source tag ${
                      index + 1
                    } <span class="text-success"><strong>PASS</strong></span>`
                  );
                } else {
                  sourceResults.push(
                    `Densities of ${value} in source tag ${
                      index + 1
                    } <span class="text-danger"><strong>FAIL</strong></span>`
                  );
                }
              } else {
                sourceResults.push(
                  `Cannot find ${set} in source tag ${index + 1}`
                );
              }
            });
          } else if (dashKey === 'widths' || 'data-widths') {
            let set;
            dashKey === 'widths' ? (set = 'srcset') : (set = 'data-srcset');
            sources.forEach((source, index) => {
              const srcset = source.getAttribute(set);
              if (srcset) {
                const patternArray = value.map(
                  (value) => `(?=.*\\b${value}\\b)`
                );
                const patternString = patternArray.join('');
                const regexp = new RegExp(patternString);
                let result = regexp.test(srcset);
                if (result === true) {
                  sourceResults.push(
                    `Widths of ${value} in source tag ${
                      index + 1
                    } <span class="text-success"><strong>PASS</strong></span>`
                  );
                } else {
                  sourceResults.push(
                    `Widths of ${value} in source tag ${
                      index + 1
                    } <span class="text-danger"><strong>FAIL</strong></span>`
                  );
                }
              } else {
                sourceResults.push(
                  `Cannot find ${set} in source tag ${index + 1}`
                );
              }
            });
          }
        }
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
  sourceResults.forEach((value) => {
    sourceResultsList += `<li>${value}</li>`;
  });

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




const images = window.testImages;

images.forEach((image) => {
  if (image.id && image.tests) {
    checkPicture(image.id, image.tests);
  }
});
