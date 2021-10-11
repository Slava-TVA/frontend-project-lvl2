#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the current version')
  .helpOption('-h, --help', 'output usage information')
  // .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
