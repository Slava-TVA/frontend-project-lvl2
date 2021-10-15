const strOrObj = (value) => {
  if (typeof value === 'object' && !(value === null)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};
const getObjName = (obj, parent) => {
  if (!parent) {
    return `${obj.name}`;
  }
  return `${parent}.${obj.name}`;
};
const plainFormatter = (data, parent) => {
  const arrayOfLines = data
    .filter((obj) => obj.type !== 'unchangeable')
    .map((obj) => {
      if (obj.type === 'added') {
        return `Property '${getObjName(obj, parent)}' was added with value: 
${strOrObj(obj.value)}`;
      }
      if (obj.type === 'removed') {
        return `Property '${getObjName(obj, parent)}' was removed`;
      }
      if (obj.type === 'changed') {
        return `Property '${getObjName(obj, parent)}' was updated. From 
${strOrObj(obj.valueBefore)} to ${strOrObj(obj.valueAfter)}`;
      }
      return plainFormatter(obj.children, getObjName(obj, parent));
    })
    .filter((item) => item !== '');
  const result = arrayOfLines.join('\n');
  return result;
};
export default plainFormatter;
