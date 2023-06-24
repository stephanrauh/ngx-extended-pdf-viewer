cp -r ../common/ .
docker build --no-cache -t ng13 . --no-cache
rm -r  ./demo/src
container_id=$(docker run --rm -d -p 4200:80 ng13)
cd ../playwright/tests
npm i
npx playwright test
docker stop $container_id
