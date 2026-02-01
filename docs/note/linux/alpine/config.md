---
title: 配置系统
createTime: 2026/02/01 13:26:23
permalink: /note/linux/alpine/config/
---
在安装完 Alpine 系统后，需要进行一些配置，才能正常使用。

# 设置DNS

一般情况下不需要，云厂商会帮你配置好  

```bash
alpine-vps:~# setup-dns
DNS Domain name? (e.g. 'bar.com') nameserver
DNS nameserver(s)? [223.5.5.5] 1.1.1.1 8.8.8.8
```

# 换源并更新

```bash
# 配置社区阿里云源
cd /etc/apk
vi repositories  
## 将community前面的# 打开

## 可选edge源
http://mirrors.aliyun.com/alpine/edge/community
http://mirrors.aliyun.com/alpine/edge/testing

# 更新系统及软件包
apk update
apk upgrade
```

# 配置 IP 信息

在这里可以将dhcp改为静态配置

```bash
# 编辑网络配置文件
vi /etc/network/interfaces
## 将默认的 DHCP 配置修改为静态 IP
auto eth0
iface eth0 inet static
   address 192.168.1.100
   netmask 255.255.255.0
   gateway 192.168.1.1
   dns-nameservers 8.8.8.8

# 配置 DNS（可选） 
vi /etc/resolv.conf

nameserver 8.8.8.8

# 重启网络服务 使配置立即生效
ifdown eth0 && ifup eth0
```

# 安装基本软件包

```bash
apk add --no-cache vim openssh util-linux bash bash-doc  bash-completion curl net-tools unzip zip jq openssl tar iproute2 lsblk htop
```

# 校时

```bash
# 设置时区
setup-timezone -z Asia/Shanghai

# 使用 chrony进行校时
## 安装 chrony
apk add chrony

## 启动服务并设置开机自启
rc-service chronyd start
rc-update add chronyd
```
