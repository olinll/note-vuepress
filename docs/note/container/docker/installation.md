---
title: 安装 Docker
createTime: 2026/02/01 13:09:27
permalink: /note/container/docker/installation/
tags:
  - Docker
---

::: note

因为 Docker 镜像在国内拉取较慢，所以我们一般使用镜像站进行拉取，或者自建 Docker 仓库

这里推荐一个镜像站[轩辕镜像站](https://xuanyuan.cloud)

:::


## 一行命令安装（推荐）

专为国内用户优化的 Docker 镜像加速解决方案，一键配置即可享受极速下载体验

```bash
bash <(curl -sSL https://xuanyuan.cloud/docker.sh)
```

## Ubuntu 手动安装

```bash
# 安装前先卸载操作系统默认安装的docker，
sudo apt-get remove docker docker-engine docker.io containerd runc

# 安装必要支持
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

# 添加 Docker
## 官方 GPG key （可能国内现在访问会存在问题）
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
## 阿里源（推荐使用阿里的gpg KEY）
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 apt 源:
## Docker官方源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
## 阿里apt源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新源
sudo apt update
sudo apt-get update

# 安装最新版本的Docker
sudo apt install docker-ce docker-ce-cli containerd.io

# 等待安装完成...

# 查看Docker版本
sudo docker version

# 查看Docker运行状态
sudo systemctl status docker
```

## CentOS / RHEL

```bash
# 更新 yum 包
yum -y update
## 区分
## yum -y update：升级所有包同时也升级软件和系统内核；
## yum -y upgrade：只升级所有包，不升级软件和系统内核

# 卸载旧版本
yum remove docker  docker-common docker-selinux docker-engine

# 安装需要的软件包
yum install -y yum-utils device-mapper-persistent-data lvm2

# 设置 yum 源
## 设置一个yum源，下面两个都可用
## 中央仓库
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo
## 阿里仓库 推荐
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 选择docker版本并安装
## 查看可用版本
yum list docker-ce --showduplicates | sort -r
## 安装指定版本
#sudo yum -y install docker-ce-17.12.1.ce
## 安装Docker
yum -y install docker-ce

# 等待安装完成...

# 查看Docker版本
docker version

# 查看Docker运行状态
systemctl status docker
```

## Alpine

```bash
# 更新软件源 确保有community源
apk update

# 安装docker
apk add docker docker-compose

# 配置文件
## 创建配置目录
mkdir -p /etc/docker
## 配置daemon.json
cat > /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "5m",
    "max-file": "2"
  },
  "storage-driver": "overlay2",
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 1024,
      "Soft": 512
    }
  },
  "max-concurrent-downloads": 1,
  "max-concurrent-uploads": 1
}
EOF

## 重启Docker使配置生效
rc-service docker restart

# 常用命令
## 开机自启
rc-update add restart boot
## 重启Docker服务
rc-service docker restart
## 启动Docker服务
rc-service docker start
## 停止Docker服务
rc-service docker stop
## 查看Docker服务状态
rc-service docker status
```