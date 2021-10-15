import _ from 'lodash';
import getFileData from './src/parsers.js';
import formatter from './src/formatters/index.js';

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  const getDiff = (obj1, obj2) => {
    const overallKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
    const uniqKeys = _.uniq(overallKeys);
    const result = uniqKeys.map((key) => {
      let resultObj;
      if (!_.has(obj1, key)) {
        resultObj = { name: key, type: 'added', value: obj2[key] };
      }
      if (!_.has(obj2, key)) {
        resultObj = { name: key, type: 'removed', value: obj1[key] };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        resultObj = { name: key, type: 'common', children: getDiff(obj1[key], obj2[key]) };
      }
      if ((typeof obj1[key] !== typeof obj2[key]) || (obj1[key] !== obj2[key])) {
        resultObj = {
          name: key,
          type: 'changed',
          valueBefore: obj1[key],
          valueAfter: obj2[key],
        };
      }
      return resultObj ?? { name: key, type: 'unchangeable', value: obj1[key] };
    });
    return _.sortBy(result, 'name');
  };
  const diffData = getDiff(data1, data2);
  return formatter(diffData, format);
};

export default gendiff;
