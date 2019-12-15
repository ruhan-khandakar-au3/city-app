exports.upperFirstCharacter = string =>
  string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

exports.removeSpace = string => string.split(" ").join("-");
exports.removeDash = string => string.split("-").join(" ");
