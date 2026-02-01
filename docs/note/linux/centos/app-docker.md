---
title: 安装 Docker
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-docker/
tags:
  - Centos
  - Docker
---

::: note

安装前必读

在安装 Docker 之前，先说一下配置，我这里是Centos7

Linux 内核：官方建议 3.10 以上，3.8 以上貌似也可。

:::

注意：本文的命令使用的是 root 用户登录执行，不是 root 的话所有命令前面要加 sudo

:::tip

现在可以使用[轩辕镜像站](https://xuanyuan.cloud)的一键安装脚本进行安装了


[前往 **安装Docker** 深入了解](/note/container/docker/docker-install/#安装-docker){.read-more}

:::

## 安装

```bash
# 查看当前内核版本
uname -r

# 卸载旧版本
yum remove docker  docker-common docker-selinux docker-engine

# 安装需要的软件包
yum install -y yum-utils device-mapper-persistent-data lvm2

# 设置yum源，下面两个都可用
# 中央仓库
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo

# 阿里仓库 推荐
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#查看docker可用版本
yum list docker-ce --showduplicates | sort -r

# 安装docker
yum -y install docker-ce
## 安装指定版本
#yum -y install docker-ce-17.12.1.ce
```

## 配置docker服务

### 常用 Docker 命令

```bash
# 重启Docker服务
systemctl restart docker

# 开启Docker服务
systemctl start docker

# 停止Docker服务
systemctl stop docker

# Docker服务开机自启
systemctl enable docker
```

### 修改docker数据目录位置

原文件位置：`/var/lib/docker/`

更改到：`/app/docker`

```json title="/etc/docker/daemon.json"
{
  "data-root": "/app/docker"
}
```

### 配置容器日志

```json title="/etc/docker/daemon.json"
"log-opts": {"max-size":"500m", "max-file":"3"}
```

> max-size=500m，意味着一个容器日志大小上限是 500M
> 
> max-file=3，意味着一个容器有三个日志，分别是 id+.json、id+1.json、id+2.json
> 
> _注：设置后只对新添加的容器有效。_

### 指定私服仓库地址

```json title="/etc/docker/daemon.json"
"insecure-registries": [
  "http://harbor:30001"
]
```

### 镜像站点

```json title="/etc/docker/daemon.json"
"registry-mirrors": [
    "http://harbor:30001",
    "https:/docker.1panel.live"
  ]
```