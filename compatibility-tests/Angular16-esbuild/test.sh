docker build --no-cache -t ng16-esbuild . --no-cache
container_id=$(docker run --rm -d -p 4200:80 ng16-esbuild)
cd ../playwright/tests
npm i
npx playwright test
docker stop $container_id
