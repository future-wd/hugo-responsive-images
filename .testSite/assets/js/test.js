import dash from './utils/camelToDash';

const resultsToList = (results) => {
  const resultsList = results.map((value) => `<li>${value}</li>`);
  const list = `
    <ul>
    ${resultsList.join('')}
    </ul>
    `;
  return list;
};

const checkPicture = (divId, checks) => {
  // results array
  const resultsArray = [];
  // debug header array
  const debug = [];
  // get wrapper div by id
  const div = document.getElementById(divId);
  if (div) {
    // loop over each check e.g. picture, img, figure etc.
    for (tagKey in checks) {
      // results for this tag
      let results = [];
      if (tagKey === 'source') {
        // ... to spread HTML collection into array
        const sources = [...div.getElementsByTagName('source')];
        if (!sources) {
          results.push('source(s) tags cannot be found');
        } else {
          for (checkKey in checks.source) {
            propName = dash(checkKey)
            const propValue = checks.source[checkKey];
            // if types is passed
            if (checkKey === 'types') {
              const sourceFormats = [];
              sources.forEach((source, index) => {
                const typeValue = source.getAttribute('type');
                if (typeValue) {
                  // remove 'image/' from type
                  const imageType = typeValue.slice(6);
                  sourceFormats.push(imageType);
                } else {
                  results.push(
                    `cannot find type property in source tag #${index + 1}`
                  );
                }
              });
              // convert objects to strings for easy comparison
              if (propValue.toString == sourceFormats.toString) {
                results.push(
                  `Source formats of "${propValue}" <span class="text-success"><strong>PASS</strong></span>`
                );
              } else {
                results.push(
                  `Source formats of "${propValue}" <span class="text-danger"><strong>FAIL</strong></span> formats are "${sourceFormats}"`
                );
              }
            } else if (propName === 'densities' || 'data-densities') {
              let set;
              propName === 'densities'
                ? (set = 'srcset')
                : (set = 'data-srcset');
              sources.forEach((source, index) => {
                const srcset = source.getAttribute(set);
                if (srcset) {
                  const patternArray = propValue.map(
                    (value) => `(?=.*\\b${value}\\b)`
                  );
                  const patternString = patternArray.join('');
                  const regexp = new RegExp(patternString);
                  let result = regexp.test(srcset);
                  if (result === true) {
                    results.push(
                      `Densities of ${propValue} in source tag ${
                        index + 1
                      } <span class="text-success"><strong>PASS</strong></span>`
                    );
                  } else {
                    results.push(
                      `Densities of ${propValue} in source tag ${
                        index + 1
                      } <span class="text-danger"><strong>FAIL</strong></span>`
                    );
                  }
                } else {
                  results.push(
                    `Cannot find ${set} in source tag ${index + 1}`
                  );
                }
              });
            } else if (propName === 'widths' || 'data-widths') {
              let set;
              propName === 'widths' ? (set = 'srcset') : (set = 'data-srcset');
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
                    results.push(
                      `Widths of ${value} in source tag ${
                        index + 1
                      } <span class="text-success"><strong>PASS</strong></span>`
                    );
                  } else {
                    results.push(
                      `Widths of ${value} in source tag ${
                        index + 1
                      } <span class="text-danger"><strong>FAIL</strong></span>`
                    );
                  }
                } else {
                  results.push(
                    `Cannot find ${set} in source tag ${index + 1}`
                  );
                }
              });
            }
          }
        }
      } else {
        // tags other than source
        // check for tag name
        const tag = div.getElementsByTagName(tagKey)[0];
        if (!tag) {
          results.push(`${tagKey} (${tagKey}) is not a valid tag name`);
        } else {
          for (checkKey in checks[tagKey]) {
            // if class prop exists
            if (checkKey === 'class') {

              const missingClasses = [];
              const checkClasses = checks[tagKey].class;
              checkClasses.forEach((className) => {
                // img fluid then lazyloaded
                // ... to spread HTML collection into array
                classes = [...tag.classList];
                const found = classes.includes(className);
                if (found === false) {
                  missingClasses.push(className);
                }
              });
              if (missingClasses.length) {
                results.push(
                  `Classes of ${checkClasses} <span class="text-danger"><strong>FAIL</strong></span> (${missingClasses} not found)`
                );
              } else {
                results.push(
                  `Classes of ${checkClasses} <span class="text-success"><strong>PASS</strong></span>`
                );
              }
            } else if (checkKey === 'notClass') {
              // if notClass prop exists (check that classes dont exist)
              const matchedClasses = [];
              const checkNotClasses = checks[tagKey].notClass;
              checkNotClasses.forEach((className) => {
                // ... to spread HTML collection into array
                classes = [...tag.classList];
                const matches = classes.includes(className);
                if (matches === true) {
                  matchedClasses.push(className);
                }
              });
              if (matchedClasses.length) {
                results.push(
                  `Not classes of ${checkNotClasses} <span class="text-danger"><strong>FAIL</strong></span> (${matchedClasses} found)`
                );
              } else {
                results.push(
                  `Not classes of ${checkNotClasses} <span class="text-success"><strong>PASS</strong></span>`
                );
              }
            } else {
              const propName = dash(checkKey);
              const propValue = tag.getAttribute(propName);
              const value = checks[tagKey][checkKey];
              if (propValue) {
                // == used as value is int, propertyValue is string
                if (propValue == value) {
                  results.push(
                    `${propName}="${value}" <span class="text-success"><strong>PASS</strong></span>`
                  );
                } else {
                  results.push(
                    `${propName}="${value}" <span class="text-danger"><strong>FAIL</strong></span> (${propName}="${propValue}")`
                  );
                }
              } else {
                results.push(
                  `<span class="text-danger">Cannot find property ${propName}`
                );
              }
            }
          }
        }
      }
      // create list from results
      const resultsList = `
      ${tagKey} tag:
      ${resultsToList(results)}
      `;
      // push to resultsArray
      resultsArray.push(resultsList);
    }
  }

  // print array to string with new lines
  const resultsId = `${divId}-results`;
  const resultsDiv = document.getElementById(resultsId);
  if (resultsDiv) {
    if (resultsArray.length) {
      resultsDiv.innerHTML += resultsArray.join('');
    }
  } else {
    debug.push(`cannot find &lt;div id="${resultsId}"&gt;`);
  }

  // create debug info
  // for top of the page
  // push text to debug variable
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
