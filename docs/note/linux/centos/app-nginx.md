---
title: 安装 Nginx
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-nginx/
tags:
  - Centos
  - Nginx
---

使用yum安装nginx

# 安装

配置nginx源

```bash
# 执行如下命令
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# 执行以下命令开始安装

yum install -y nginx

# 启动nginx
systemctl start nginx
# nginx开机自启动
systemctl enable nginx
```

# 生产配置

通常我们不会直接修改nginx主配置文件，会采用引入的方式去配置

可以一个端口配置多个站点，nginx允许这样操作

```sql title="nginx.conf"
# a站点
server {
    listen 80;
    server_name  a.com;
}
# b站点
server {
    listen 80;
    server_name  b.com;
}
# c站点
server {
    listen 80;
    server_name  c.com;
}
```

**nginx主配置文件常用配置**

```sql title="nginx.conf"
# 处理HTTP请求和响应，适用于Web应用和网站
http{
  # 其他内容......

  #这里可以吧默认的include /etc/nginx/conf.d/*.conf;注释掉，方式展示80端口

  # 引入外部配置文件
  include /opt/nginx/http/*.conf;

  #不限制文件上传大小
  client_max_body_size 0;
}

# 支持通用TCP和UDP代理，适用于多种应用
stream{
  # 引入外部配置
  include /aoptp/nginx/server/*.conf;
}
```

**常规vue反向代理配置**

```sql title="nginx.conf"
server {
    listen       7000;
    server_name  localhost;
    index index.html;
    
     set $root "/app/h5";

    location / {
        root   $root;  # 网站根目录
        index  index.html;   # 默认首页文件
        try_files  $uri $uri/ /index.html;
        add_header Access-Control-Allow-Origin *;
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' *;
        add_header 'Access-Control-Allow-Headers' *;
        add_header Cache-Control no-cache;
    }

    location ^~ /api {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            return 204;
        }

        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;

        # 重写：/api/xxx → /xxx
        rewrite ^/api/(.*)$ /$1 break;

        proxy_pass http://192.168.1.20:31100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }

    
}
```

**SSL配置**

```sql title="nginx.conf"
server {
  
    listen 80;
    server_name  abc.com;
    listen 443 ssl;
    
    ssl_certificate    /opt/nginx/cert/abc.com.pem;
    ssl_certificate_key    /opt/nignx/cert/abc.com.key;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;    

    # 管理-路由
    location / {
        root   /opt/web/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
        index index.html;
    }
    # 后台地址
    location /prod-api/ {
      proxy_pass  http://127.0.0.1:7001/ ;
    }
   
}
```

**使用nginx代理服务端口，例如MySQL**

```sql title="stream_nginx.conf"
# 这个要写在stream块里面
upstream mysql3306 {
        hash $remote_addr consistent;
        server 192.168.1.58:3306 weight=5 max_fails=3 fail_timeout=30s;
}

server {
        listen 33306;
        proxy_connect_timeout 100s;
        proxy_timeout 500s;
        proxy_pass mysql3306 ;
}
```

**例外，minio的特殊配置**

如果出现页面上显示 `“ The request signature we calculated does not match the signature you provided. Check your key and signing method.”` 可以使用此配置文件解决

签名是放在header头当中的，所以一定要设置 `proxy_set_header`

```sql title="minio.conf"
# minio-api反向代理配置
server {
  server_name  localhost;
  listen 9000; # 外网端口
  location / {
    proxy_set_header Host $http_host;
    proxy_pass  http://192.168.1.10:9001/;# minio地址
  }
} 
```