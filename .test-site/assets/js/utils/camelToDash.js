// convert camelCase to camel-case
const dash = (camelCase) => {
  const noCamel = camelCase.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  return noCamel;
}

export default dash;
