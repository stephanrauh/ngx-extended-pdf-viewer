#!/bin/bash
npmUpdateAll(){
  for file in $(find . -type f -name "package.json" -not \( -path "*/node_modules/*" \) -not \( -path "*/dist/*" \) -not \( -path "*/bower_components/*" \)); do
    cd $(dirname "$file")
    if [ -f "package.json"  ]; then
      PWD
      npm i
      npm up
      npm audit fix
      PWD
      echo "---------------"
      echo "---------------"
    fi
    cd "$dir"
  done
}

dir="$PWD"
npmUpdateAll

cd ../extended-pdf-viewer-showcase
dir="$PWD"
npmUpdateAll

cd ../issues
dir="$PWD"
npmUpdateAll
