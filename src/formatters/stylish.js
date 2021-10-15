const addSpaces = (spaces) => ('    '.repeat(spaces));
const strOrObj = (value, spaces = 0) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const arrayOfValues = Object.keys(value).map((key) => `${addSpaces(spaces)}
${key}: ${strOrObj(value[key], spaces + 1)}`);
  const newValue = arrayOfValues.join('\n');
  return `{\n${newValue}\n${addSpaces(spaces)}}`;
};
const stylishFormatter = (data, spaces = 0) => {
  const arrayOfLines = data.map((obj) => {
    switch (obj.type) {
      case 'added':
        return `${addSpaces(spaces)}  + ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
      case 'removed':
        return `${addSpaces(spaces)}  - ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
      case 'unchangeable':
        return `${addSpaces(spaces)}    ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
      case 'changed':
        return `${addSpaces(spaces)}  - ${obj.name}: ${strOrObj(obj.valueBefore, spaces + 1)}
        \n${addSpaces(spaces)}  + ${obj.name}: ${strOrObj(obj.valueAfter, spaces + 1)}`;
      default:
        return `${addSpaces(spaces)}    ${obj.name}: ${stylishFormatter(obj.children, spaces + 1)}`;
    }
  });
  const result = arrayOfLines.join('\n');
  return `{\n${result}\n${addSpaces(spaces)}}`;
};

export default stylishFormatter;
