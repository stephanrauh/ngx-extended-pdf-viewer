cp -r ../common/ .
docker build -t ng12 . --no-cache
rm -r  ./demo/src
container_id=$(docker run --rm -d -p 4200:80 ng12)
cd ../playwright/tests
npm i
npx playwright test
docker stop $container_id

