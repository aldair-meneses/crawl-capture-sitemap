const pagesUrls = [];

const args = process.argv.slice(2);

const options  = args.filter(arg => arg.startsWith('--'));
const filteredOptions = options.filter(arg => !arg.startsWith('--pages='));

const pagesOption = options.find(arg => arg.startsWith('--pages='));
if (pagesOption) {
  pagesOption.split('=')[1].split(',').map(page => pagesUrls.push(page));
}

module.exports = pagesUrls;

