version=$(node ./read-version-number.js);
git tag -a $version -m "$version"
git push origin --tags
#readme=$(<./projects/ngx-extended-pdf-viewer/README.md)
#curl \
#  -X POST \
#  -H "Accept: application/vnd.github.v3+json" \
#  https://api.github.com/repos/stephanrauh/ngx-extended-pdf-viewer/releases \
#  -d '{"tag_name":$version,"body": "$readme"}'
node ./increase-version-number.js
