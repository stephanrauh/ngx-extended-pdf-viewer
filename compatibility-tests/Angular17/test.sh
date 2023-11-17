cp -r ../common/ .
docker build --no-cache -t ng17 . --no-cache
rm -r  ./demo/src
rm -r ./nginx
container_id=$(docker run --rm -d -p 4200:80 ng16)
cd ../playwright/tests
npm i
npx playwright test
docker stop $container_id
