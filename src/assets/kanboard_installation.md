# Kanboard Installation in a Pacman-Based Linux Distribution

**Kanboard** is a Kanban board PHP application that allows the management of
projects that uses the KanBahn methodology.

First, install **nginx** as the web server to serve this application:

```
$ pacman -S nginx
```

Configure **nginx** server:

#### **`/etc/nginx/nginx.conf`**
```
user http;
worker_processes auto;
worker_cpu_affinity auto;

events {
    multi_accept on;
    worker_connections  1024;
}

http {
    charset utf-8;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    server_tokens off;
    log_not_found off;
    types_hash_max_size 4096;
    client_max_body_size 16M;
    
    include mime.types;
    default_type  application/octet-stream;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

Create the folders *sites-available* and *sites-enabled*:

```
$ mkdir /etc/nginx/sites-available
$ mkdir /etc/nginx/sites-enabled
```

Create the file *kanboard.conf* in *sites-available* folder and edit it:

```
$ touch /etc/nginx/sites-available/kanboard.conf
```

#### **`/etc/nginx/sites-available/kanboard.conf`**
```
server {
    root /usr/share/nginx/kanboard;

    location / {
        index index.html index.htm index.php;
    }

    location ~ \.php$ {
        # 404
        try_files $fastcgi_script_name =404;

        # default fastcgi_params
        include fastcgi_params;

        # fastcgi settings
        fastcgi_pass			unix:/run/php-fpm/php-fpm.sock;
        fastcgi_index			index.php;
        fastcgi_buffers			8 16k;
        fastcgi_buffer_size		32k;

        # fastcgi params
        fastcgi_param DOCUMENT_ROOT	$realpath_root;
        fastcgi_param SCRIPT_FILENAME	$realpath_root$fastcgi_script_name;
        #fastcgi_param PHP_ADMIN_VALUE	"open_basedir=$base/:/usr/lib/php/:/tmp/";
    }
}
```

Symlink *kanboard.conf* file in *sites-enabled* folder:

```
$ ln -s /etc/nginx/sites-available/kanboard.conf /etc/nginx/sites-enabled/kanboard.conf
```

Clone the **kanboard** repository in appropriate folder:

```
$ cd /usr/share/nginx/
$ git clone https://github.com/kanboard/kanboard.git
```

Edit *php-fpm* service (using root):

```
# systemctl edit php-fpm.service
```

#### **`/etc/systemd/system/php-fpm.service.d/override.conf partial file`**
```
[Service]
ReadWritePaths=/usr/share/nginx/kanboard/data
```

Install **sqlite** database:

```
$ pacman -S php-sqlite
$ pacman -S php-gd
```

Edit *php.ini* file:

#### **`/etc/php/php.ini partial file`**
```
extension=curl
extension=gd
extension=pdo_sqlite
extension=sqlite3
extension=zip
```

Restart *php-fpm* and *nginx* services:

```
$ systemctl restart php-fpm.service
$ systemctl restart nginx.service
```

Access [http://localhost](http://localhost). The default username and password
is **admin/admin**.

![Kanboard application being executed in browser](/assets/kanboard_in_browser.png)
