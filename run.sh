curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version

docker pull truong11t2/laca-blog
docker network create mynetwork
docker run --name laca --network mynetwork -d truong11t2/laca-blog
docker run --name nginx-proxy --network mynetwork -p 80:80 -p 443:443 -v /etc/nginx/sites-available/laca.fun:/etc/nginx/nginx.conf:ro -v /etc/letsencrypt:/etc/letsencrypt:ro -d nginx

docker run -d --network mynetwork --name mongodb -v mongo-data:/data/db -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=mydb mongo:latest


# docker run -it --rm --name certbot \
#     -v /etc/letsencrypt:/etc/letsencrypt \
#     -v /var/lib/letsencrypt:/var/lib/letsencrypt \
#     certbot/certbot certonly --standalone \
#     -d laca.fun -d www.laca.fun

############## nginx configuration ############## laca.fun file #############
# events {}

# http {
#     server {
#         listen 80;
#         server_name laca;

#         location / {
#             return 301 https://$host$request_uri;
#         }
#     }

#     server {
#         listen 443 ssl;
#         server_name laca;

#         ssl_certificate /etc/letsencrypt/live/laca.fun/fullchain.pem;
#         ssl_certificate_key /etc/letsencrypt/live/laca.fun/privkey.pem;

#         location / {
#             proxy_pass http://laca:5000;
#         }
#     }

#     server {
#         listen 80;
#         server_name www.laca.fun;

#         location / {
#             return 301 https://$host$request_uri;
#         }
#     }

#     server {
#         listen 443 ssl;
#         server_name www.laca.fun;

#         ssl_certificate /etc/letsencrypt/live/laca.fun/fullchain.pem;
#         ssl_certificate_key /etc/letsencrypt/live/laca.fun/privkey.pem;

#         location / {
#             proxy_pass http://laca:5000;
#         }
#     }
# }
