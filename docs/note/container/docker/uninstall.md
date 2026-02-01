---
title: 卸载 Docker
createTime: 2026/02/01 13:13:39
permalink: /note/container/docker/uninstall/
---

> [!CAUTION]
> 在卸载前，需确认是否保留容器、镜像、卷或配置文件

# Ubuntu

**停止 Docker 相关服务**

```bash
# 停止Docker服务
sudo systemctl stop docker docker.socket containerd.service
 
# 确认服务已停止
sudo systemctl status docker  # 应显示“inactive”
```

**移除 DOcker 包**

```bash
# 卸载Docker包
sudo apt purge -y docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-scan-plugin
 
# 自动清理未使用依赖
sudo apt autoremove -y
```

**删除残留文件与目录**

```bash
# 删除核心数据目录（镜像、容器、卷等）
sudo rm -rf /var/lib/docker /var/lib/containerd
 
# 删除配置文件
sudo rm -rf /etc/docker /etc/default/docker
 
# 删除用户配置
rm -rf ~/.docker
 
# 删除日志文件
sudo rm -rf /var/log/docker /var/log/containerd
```

# CentOS / RHEL

**停止服务与进程**

```bash
sudo systemctl stop docker containerd
sudo systemctl disable docker containerd  # 禁止开机自启
```

**移除 Docker 包**

```bash
sudo yum remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo yum autoremove -y
```

**清理残留文件**

```bash
sudo rm -rf /var/lib/docker /var/lib/containerd /etc/docker ~/.docker
sudo rm -rf /usr/lib/systemd/system/docker.service /usr/lib/systemd/system/docker.socket
sudo systemctl daemon-reload  # 刷新systemd配置
```