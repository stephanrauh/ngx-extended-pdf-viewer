if git status --porcelain | grep -q .; then
  echo "There are uncommitted files"
  exit 1
fi
cd ../mypdf.js
if git status --porcelain | grep -q .; then
  echo "There are uncommitted files"
  exit 1
fi
