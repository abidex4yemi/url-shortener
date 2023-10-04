exports.getNWordFromStr = (str, start, end) => {
  let title = str || '';
  return title.split(/\s+/).slice(start, end).join(' ');
};
