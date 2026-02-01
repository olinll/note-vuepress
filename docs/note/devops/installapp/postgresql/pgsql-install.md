---
title: 安装 PostgreSQL
createTime: 2026/02/01 21:51:55
permalink: /note/devops/installapp/postgresql/pgsql-install/
---
## Ubuntu 二进制

查询安装包

```bash
apt search postgresql 14
```

安装

```bash
apt -install postgresql-14
```

修改数据库密码

```bash
# 登录postgres用户
su - postgres
# 登录到数据库中
psql

# 或者直接以root用户登录
psql -U postgres

# 修改密码
alter user postgres with password 'xxxxxx';
```

## Docker-Compose

此种方式适合测试环境，可以在一台主机上运行多个Postgres容器

```yaml
services:
  pgsql:
    image: docker.xuanyuan.run/postgres:14
    container_name: postgres_hfcy
    restart: always

    command: >
      postgres
      -c config_file=/etc/postgresql/postgresql.conf
      -c hba_file=/etc/postgresql/pg_hba.conf

    environment:
      POSTGRES_PASSWORD: Passwd@2026 # 默认密码
      TZ: Asia/Shanghai

    ports:
      - "6432:5432"

    volumes:
      - /opt/pgsql/01/data:/var/lib/postgresql/data  # 数据目录
      - /opt/pgsql/01/config/postgresql.conf:/etc/postgresql/postgresql.conf:ro
      - /opt/pgsql/01/config/pg_hba.conf:/etc/postgresql/pg_hba.conf:ro

    networks:
      - net

networks:
  net:
    name: app-net
    driver: bridge
    external: true
```