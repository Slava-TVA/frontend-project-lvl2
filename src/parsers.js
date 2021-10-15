import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';

const getFileData = (filePath) => {
  const data = readFileSync(resolve(cwd(), filePath));
  if (extname(filePath) === '.json') {
    const obj = JSON.parse(data);
    return obj;
  }
  if (extname(filePath) === '.yml' || extname(filePath) === '.yaml') {
    const obj = yaml.load(data);
    return obj;
  }
  return data;
};
export default getFileData;
