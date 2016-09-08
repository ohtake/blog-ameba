const fs = require('fs');
const spawn = require('cross-spawn');
const max = require('lodash/max');

const articleFilename = /^(\d{8})-\w+\.md$/;
const files = fs.readdirSync('.').filter(fn => articleFilename.test(fn));
const dates = files.map(fn => articleFilename.exec(fn)[1]);
const maxDate = max(dates);

if (!maxDate) {
  console.warn('No files to run textlint');
  process.exit(0);
}

const filesToLint = files.filter(fn => fn.startsWith(maxDate));
spawn('./node_modules/.bin/textlint', filesToLint, { stdio: 'inherit' });
