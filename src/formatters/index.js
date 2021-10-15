import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const formatter = (data, format) => {
  if (format === 'plain') {
    return plainFormatter(data);
  }
  if (format === 'json') {
    return jsonFormatter(data);
  }
  return stylishFormatter(data);
};
export default formatter;
