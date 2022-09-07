const resultsToList = (results) => {
  const resultsList = results.map((value) => `<li>${value}</li>`);
  const list = `
    <ul>
    ${resultsList.join('')}
    </ul>
    `;
  return list;
};

export default resultsToList;
