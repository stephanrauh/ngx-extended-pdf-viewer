version=$(node ./read-version-number.js);
git tag -a $version -m "$version"
git push origin --tags
