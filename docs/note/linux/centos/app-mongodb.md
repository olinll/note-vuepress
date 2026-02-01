---
title: 安装 MongoDB
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-mongodb/
tags:
  - Centos
  - MongoDB
---

仅复制教程，未验证可行性

## 安装

添加 mongodb 软件仓库

```bash title="/etc/yum.repos.d/mongodb-org-3.4.repo"
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```

```bash
# 安装
yum install -y mongodb-org
```

## 配置

**修改配置文件**

```bash
# 修改配置文件
vim /etc/mongod.conf
## 把bindIP改成 0.0.0.0所有的机器都可以访问
```

**启动MogoDB**

```bash
# 启动
systemctl start mongod.service
# 停止
systemctl stop mongod.service 
# 重启
systemctl restart mongod.service
```

**链接mongodb**

```bash
mongo 127.0.0.1:27017
```

默认将数据文件存储在 `/var/lib/mongo`目录

默认日志文件在 `/var/log/mongodb`中。

如果要修改,可以在 `/etc/mongod.conf` 配置中指定备用日志和数据文件目录

**mongodb设置密码**

```bash
# 登录mogodb
mongo 127.0.0.1:7316

use admin

db.createUser({ user: "admin", pwd: "password", roles: [{ role: "root", db: "admin" }] })


# 修改配置
vim /etc/mongod.conf

security:
   authorization: enabled

# 重启服务
systemctl restart mongod
```