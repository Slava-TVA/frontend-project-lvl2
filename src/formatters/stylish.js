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
    if (obj.type === 'added') {
      return `${addSpaces(spaces)}  + ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
    }
    if (obj.type === 'removed') {
      return `${addSpaces(spaces)}  - ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
    }
    if (obj.type === 'unchangeable') {
      return `${addSpaces(spaces)}    ${obj.name}: ${strOrObj(obj.value, spaces + 1)}`;
    }
    if (obj.type === 'changed') {
      return `${addSpaces(spaces)}  - ${obj.name}: ${strOrObj(obj.valueBefore, spaces + 1)}
      \n${addSpaces(spaces)}  + ${obj.name}: ${strOrObj(obj.valueAfter, spaces + 1)}`;
    }
    return `${addSpaces(spaces)}    ${obj.name}:
${stylishFormatter(obj.children, spaces + 1)}`;
  });
  const result = arrayOfLines.join('\n');
  return `{\n${result}\n${addSpaces(spaces)}}`;
};

export default stylishFormatter;
