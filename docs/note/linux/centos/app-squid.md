---
title: 安装 Squid 代理服务
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-squid/
tags:
  - Centos
  - Squid
---


在实际操作的时候，可能遇到服务器没有网络，那么我们就需要在边缘服务器安装一个代理工具

找一台可以接入局域网的服务器，安装squid组件，作为一个代理服务器使用

## 安装

**在有互联网的服务器上面进行安装**

```bash
# 安装squid
yum install -y squid

# 启动服务
systemctl start squid
systemctl enable squid

# 配置文件
vim /etc/squid/squid.conf

# 允许所有访问
## 注释掉所有的http_access
http_access allow all

# 重启服务
systemctl restart squid
```

## 使用方式

**在无互联网的服务器上如何使用**

```bash
# 配置http、https代理
## 仅在当前命令行中有效
## 请勿使用sudo命令，sudo yum install 无法通过代理安装软件
export http_proxy=http://代理服务器ip:3128
export https_proxy=http://代理服务器ip:3128

# 例如
export http_proxy=http://192.168.0.217:3128
export https_proxy=http://192.168.0.217:3128


# 查看代理配置
echo $http_proxy
echo $https_proxy
```