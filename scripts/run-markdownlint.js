const fs = require('fs');
const markdownlint = require('markdownlint');
const vscodeMarkdownLintConfig = require('../.markdownlint.json');

const files = fs.readdirSync('.').filter((fn) => fn.endsWith('.md'));
const options = {
  files,
  config: vscodeMarkdownLintConfig,
};

markdownlint(options, (err, result) => {
  if (!err) {
    console.log(result.toString());
  }
});
