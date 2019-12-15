/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
const sortThings = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a > b ? 1 : a < b ? -1 : 0;
};

module.exports = sortThings;
