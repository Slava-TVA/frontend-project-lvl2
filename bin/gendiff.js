#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the current version')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const diffs = gendiff(filepath1, filepath2, program.opts().format);
    console.log(diffs);
  });

program.parse(process.argv);
