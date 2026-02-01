---
title: Uptime Kuma 监控服务
createTime: 2026/02/01 22:19:12
permalink: /note/container/star/uptime-kuma/
---
:::note

在管理网站和服务器时，确保服务的稳定性非常重要。Uptime Kuma 是一款开源的监控工具，可以帮助你实时监测网站或服务的状态，并在发生故障时及时通知。它支持多种监控方式（如 HTTP、Ping、TCP 等），且操作简单，适合个人或团队自托管使用。

:::

效果见本站：[服务详情](https://status.olinl.com/)

# 部署

GitHub仓库地址：

::github{repo="louislam/uptime-kuma"}

Docker-Compose.yaml文件

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    container_name: uptime-kuma
    volumes:
      - ./data:/app/data
    ports:
      - 3001:3001
    restart: always  
    networks:
      - app-net
networks:
  app-net:
    external: true
```

