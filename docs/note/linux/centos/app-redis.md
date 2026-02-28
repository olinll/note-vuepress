---
title: 安装 Redis
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-redis/
tags:
  - Centos
  - Redis
---


该文章已迁移至 Olinl Blog，点击[前往](https://blog.olinl.com/posts/app-redis/)查看

redis版本：6.2.6

通过yum或者rpm包安装，下载文件本地编译，然后配置system文件，使用systemctl进行管理

## 下载解压

```bash
# 下载redis
wget https://cdn.olinl.com/redis-6.2.6.tar.gz
## 原地址
#wget https://download.redis.io/releases/redis-6.2.6.tar.gz

# 解压并移动到opt下
tar xzf redis-6.2.6.tar.gz
mv redis-6.2.6 /opt/redis
```

## 编译安装

```bash
# 安装编译所需工具
yum -y install gcc automake autoconf libtool make

# 进入redis安装目录，进行编译
cd /opt/redis
make MALLOC=libc

# 安装redis，并指定安装目录
make install PREFIX=/opt/redis

# 启动测试
./bin/redis-server redis.conf
```

## 配置服务

**设置redis密码**

```sql title="/opt/redis/redis.conf :901"
requirepass root
```

**外部访问redis**

```sql title="/opt/redis/redis.conf :75"
bind 0.0.0.0 ::1
```

**设置redis后台运行**

```sql title="/opt/redis/redis.conf :257"
daemonize yes
```

**设置redis服务**

创建系统服务文件

```bash title="/etc/systemd/system/redis.service"
# 内容如下
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/opt/redis/bin/redis-server /opt/redis/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

操作命令

```bash

# 重载系统服务
systemctl daemon-reload

# 服务启动操作命令
## 启动
systemctl start redis
## 停止
systemctl stop redis
## 重启
systemctl restart redis
## 查看状态
systemctl status redis
## 开机自启
systemctl enable redis
## 查看redis是否启动
ps -ef | grep redis
```