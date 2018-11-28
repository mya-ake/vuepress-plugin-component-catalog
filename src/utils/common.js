const camelToHyphen = str => {
  return str.replace(/[A-Z]/g, (match, offset) => {
    const lowerCase = match.toLowerCase();
    return offset === 0 ? lowerCase : `-${lowerCase}`;
  });
};

module.exports = {
  camelToHyphen,
};
