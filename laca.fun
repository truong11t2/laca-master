# configuration for nginx

server {
    listen 80;
    server_name laca.fun;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name laca.fun;

    ssl_certificate /etc/letsencrypt/live/laca.fun/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/laca.fun/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        # Other proxy settings as needed
    }
}

server {
    listen 80;
    server_name www.laca.fun;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name www.laca.fun;

    ssl_certificate /etc/letsencrypt/live/laca.fun/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/laca.fun/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        # Other proxy settings as needed
    }
}
