// build-search-index.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const srcDirectory = 'projects/showcase/src';

function generateTitle(filePath) {
  const parts = filePath.split(path.sep);
  const parentDir = parts[parts.length - 2];

  return parentDir
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateRoute(filePath) {
  const parts = filePath.split('pages' + path.sep);
  if (parts.length > 1) {
    return `/${parts[1].replace(`text.md`, '').split(path.sep).join('/')}`;
  }
  return filePath.startsWith('/') ? filePath : `/${filePath}`;
}

function buildSearchIndex() {
  // Update glob pattern to use srcDirectory
  const markdownFiles = glob.sync(`${srcDirectory}/app/pages/**/text.md`);

  const searchIndex = markdownFiles.map((filePath) => {
    const title = generateTitle(filePath);
    const route = generateRoute(filePath);
    const content = fs.readFileSync(filePath, 'utf-8').trim();

    return {
      title,
      route,
      content,
    };
  });

  // Create assets directory if it doesn't exist
  const assetsDir = `${srcDirectory}/assets`;
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Write to the correct assets location
  fs.writeFileSync(`${srcDirectory}/assets/search-index.json`, JSON.stringify(searchIndex, null, 2));

  console.log(`Built search index with ${searchIndex.length} documents`);
  console.log('Files indexed:', markdownFiles); // Added for debugging
}

buildSearchIndex();
