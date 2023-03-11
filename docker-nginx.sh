docker build -t my-nginx .
docker run -d -p 80:80 --link my-nest-app:nest-app my-nginx
