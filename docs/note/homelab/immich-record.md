---
title: Immich图片管理软件备忘录
createTime: 2026/02/01 13:57:38
permalink: /note/homelab/immich-record/
---

Immich‌是一款自托管的照片和视频管理软件，旨在帮助用户轻松备份、组织和管理自己的照片和视频，同时保护用户的隐私。它支持网页版、安卓端和苹果端，用户可以在多个设备上同步使用‌

官网：[https://immich.app](https://immich.app)

‍

Docker-compose安装：

官网教程：

```bash title="下载 Compose 和 .env 文件"
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```


参考：[https://immich.app/docs/install/docker-compose](https://immich.app/docs/install/docker-compose)

immich智能相册更换支持中文搜索的CLIP大模型教程

参考：[https://www.bilibili.com/opus/921308194821636097](https://www.bilibili.com/opus/921308194821636097)

‍Immich 反向地理编码汉化:

[ZingLix/immich-geodata-cn](https://github.com/ZingLix/immich-geodata-cn)

Docker-Compose配置，支持Intel核显 OpenVINO

```yaml title="docker-compose.yml"

#
# WARNING: To install Immich, follow our guide: https://docs.immich.app/install/docker-compose
#
# Make sure to use the docker-compose.yml of the current release:
#
# https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
#
# The compose file on main may not be compatible with the latest release.

name: immich

services:
  immich-server:
    container_name: immich_server
    image: ghcr.io/immich-app/immich-server:${IMMICH_VERSION:-release}
    devices:
      - /dev/dri:/dev/dri
    volumes:
      - ${UPLOAD_LOCATION}:/data
      - /etc/localtime:/etc/localtime:ro

      # Immich 反向地理编码汉化 https://github.com/ZingLix/immich-geodata-cn
      - ./geodata-cn/geodata:/build/geodata
      - ./geodata-cn/i18n-iso-countries/langs:/usr/src/app/server/node_modules/i18n-iso-countries/langs
    env_file:
      - .env
    ports:
      - '2283:2283'
    depends_on:
      - redis
      - database
    restart: always
    healthcheck:
      disable: false

  immich-machine-learning:
    container_name: immich_machine_learning
    image: ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION:-release}-openvino
    devices:
      - /dev/dri:/dev/dri
    volumes:
      - model-cache:/cache
    env_file:
      - .env
    restart: always
    healthcheck:
      disable: false

  redis:
    container_name: immich_redis
    image: docker.io/valkey/valkey:9@sha256:546304417feac0874c3dd576e0952c6bb8f06bb4093ea0c9ca303c73cf458f63
    healthcheck:
      test: redis-cli ping || exit 1
    restart: always

  database:
    container_name: immich_postgres
    image: ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0@sha256:bcf63357191b76a916ae5eb93464d65c07511da41e3bf7a8416db519b40b1c23
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_DB: ${DB_DATABASE_NAME}
      POSTGRES_INITDB_ARGS: '--data-checksums'
    volumes:
      - ${DB_DATA_LOCATION}:/var/lib/postgresql/data
    shm_size: 128mb
    restart: always
    healthcheck:
      disable: false

volumes:
  model-cache:


```

```sql title=".env"
# You can find documentation for all the supported env variables at https://docs.immich.app/install/environment-variables

# The location where your uploaded files are stored
UPLOAD_LOCATION=./library

# The location where your database files are stored. Network shares are not supported for the database
DB_DATA_LOCATION=./postgres

# To set a timezone, uncomment the next line and change Etc/UTC to a TZ identifier from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
TZ=Asia/Shanghai

# The Immich version to use. You can pin this to a specific version like "v2.1.0"
IMMICH_VERSION=v2

# Connection secret for postgres. You should change it to a random password
# Please use only the characters `A-Za-z0-9`, without special characters or spaces
DB_PASSWORD=postgres

# The values below this line do not need to be changed
###################################################################################
DB_USERNAME=postgres
DB_DATABASE_NAME=immich

```
