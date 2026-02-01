---
title: 安装 Docker
createTime: 2026/02/01 13:28:23
permalink: /note/linux/alpine/app-docker/
---



[前往 **安装Docker** 深入了解](/note/container/docker/docker-install/#安装-docker){.read-more}


```bash
# 启用cgroups
rc-update add cgroups boot
rc-service cgroups start
# 检查是否挂载
mount | grep cgroup

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
```