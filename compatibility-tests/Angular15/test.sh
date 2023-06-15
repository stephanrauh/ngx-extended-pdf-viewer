docker build --no-cache -t ng15 . --no-cache
container_id=$(docker run --rm -d -p 4200:80 ng15)
cd ../playwright/tests
npm i
npx playwright test
docker stop $container_id
