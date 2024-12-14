version=$(node ./read-version-number.js);
git commit . -m "published $version"
git push
git tag -a $version -m "$version"
git push origin --tags

cd ../mypdf.js
git checkout bleeding-edge
git commit . -m "published $version"
git push
git tag -a "ngx-extended-pdf-viewer-$version-bleeding-edge" -m "ngx-extended-pdf-viewer $version"
git push origin --tags
git checkout 4.7
git commit . -m "published $version"
git push
git tag -a "ngx-extended-pdf-viewer-$version" -m "ngx-extended-pdf-viewer $version"
git push origin --tags

#readme=$(<./projects/ngx-extended-pdf-viewer/README.md)
#curl \
#  -X POST \
#  -H "Accept: application/vnd.github.v3+json" \
#  https://api.github.com/repos/stephanrauh/ngx-extended-pdf-viewer/releases \
#  -d '{"tag_name":$version,"body": "$readme"}'

