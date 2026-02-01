---
title: 生产环境配置
createTime: 2026/02/01 13:11:13
permalink: /note/container/docker/prod-config/
---

docker的默认存储路径都在 `/var/lib/docker/` 下，生产环境的系统磁盘有限，所以我们要转移存储目录，并且做一些配置。

## 更换工作目录

由于docker默认工作目录在 `/var/lib/docker/` 下，生产环境的系统磁盘有限，所以我们需要将默认目录修改到自定义的目录下，本文修改到 `/opt/docker/` 目录下

**注意：此操作可能会造成Docker数据丢失，建议在刚安装完docker后进行此操作**

原位置：`/var/lib/docker/`

**修改配置**

```bash
# 停止DOcker服务
sudo systemctl stop docker

# 创建新的数据目录，用于存储Docker数据
mdkir -p /opt/docker/

# 修改这个数据目录的权限
chmod -R 777 /opt/docker/

# 复制文件+权限 （如有）
sudo cp -a /var/lib/docker/* /opt/docker/

# 创建Docker配置文件
mkdir /etc/docker
vim /etc/docker/daemon.json
## 在/etc/docker/daemon.json 文件内添加

{
  "data-root": "/opt/docker"
}

# 如果需要转移数据，此操作必须在转移数据后操作！！！
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证是否成功
## 在输出的信息中，找到“Docker Root Dir”一项。它应该显示新的存储路径，例如 /opt/docker/。
sudo docker info

# 确认数据无误后，删除原来的内容（可选）
rm -rf /var/lib/docker
```

## 限制日志数量

**修改配置文件（被动）**

给 Docker 添加配置文件，限制日志文件数量及其大小。

```bash
# 修改 Docker 配置文件
vim /etc/docker/daemon.json

# 添加以下配置

"log-opts": {"max-size":"500m", "max-file":"3"}

# 重载并重启docker服务
systemctl daemon-reload
systemctl restart docker
```

> max-size=500m，意味着一个容器日志大小上限是500M
> 
> max-file=3，意味着一个容器有三个日志，分别是id+.json、id+1.json、id+2.json
> 
> 注：设置后只对新添加的容器有效。

**Shell 脚本删除 Docker 日志（主动）**

写一个脚本，定时运行进行删除 Docker 日志

```bash
#!/bin/bash

# Docker容器日志清理脚本 du -h --max-depth=1

# 设置Docker日志文件存储路径
log_path="/opt/docker/containers"

# 获取所有容器ID
container_ids=$(ls -1 $log_path)

# 循环处理每个容器
for container_id in $container_ids; do
    # 构造日志文件路径
    log_file="${log_path}/${container_id}/${container_id}-json.log"

    # 检查日志文件是否存在
    if [ -f "$log_file" ]; then
        echo "清理容器 ${container_id} 的日志文件: ${log_file}"
        
        # 清空日志文件
        truncate -s 0 "$log_file"
    else
        echo "未找到容器 ${container_id} 的日志文件: ${log_file}"
    fi
done

echo "日志清理完成。"
```

## 其他配置

```sql
# 指定私服仓库地址
"insecure-registries": [
  "http://harbor:30001"
]

# 镜像站点
"registry-mirrors": [
    "http://harbor:30001",
    "https:/docker.1panel.live"
  ]
```