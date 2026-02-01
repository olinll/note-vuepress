---
title: 反向代理Minio
createTime: 2026/02/01 21:49:55
permalink: /note/devops/installapp/nginx/nginx-minio/
---
:::tip

如果出现 页面上显示“ The request signature we calculated does not match the signature you provided. Check your key and signing method.”可以使用此配置文件解决

签名是放在header头当中的，所以一定要设置 `proxy_set_header`

:::

```sql

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