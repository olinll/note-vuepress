---
title: 相关命令
createTime: 2026/02/01 13:27:33
permalink: /note/linux/alpine/bash-apk/
---

这里记录了 Alpine 系统常用的命令

## APK命令

```bash
apk update  # 更新最新镜像源列表

apk search                 # 查找所有可用软件包
apk search -v              # 查找所用可用软件包及其描述内容
apk search -v ‘包名’        # 通过软件包名称查找软件包
apk search -v -d ‘docker’  # 通过描述文件查找特定的软件包

apk add openssh                       # 安装一个软件
apk add openssh  vim  bash nginx      # 安装多个软件
apk add --no-cache mysql-client       # 不使用本地镜像源缓存，相当于先执行update，再执行add

apk info           # 列出所有已安装的软件包
apk info -a zlib   # 显示完整的软件包信息
apk info --who-owns /usr/sbin/nginx # 显示指定文件属于的包

apk upgrade            # 升级所有软件
apk upgrade openssh    # 升级指定软件
apk upgrade openssh  vim  bash nginx # 升级多个软件
apk add --upgrade busybox  # 指定升级部分软件包

apk del openssh      # 删除一个软件
apk del nginx mysql  # 删除多个软件
```

## rc服务命令

```bash
rc-update    # 主要用于不同运行级增加或者删除服务。
rc-status    # 主要用于运行级的状态管理。
rc-service   # 主用于管理服务的状态
openrc       # 主要用于管理不同的运行级。



rc-service <服务名> start    # 启动服务
rc-service <服务名> stop    # 停止服务
rc-service <服务名> restart  # 重启服务
rc-service <服务名> reload    # 重新加载配置（不重启）
rc-service <服务名> status    # 查看服务状态



rc-update add <服务名> <运行级别>    # 添加服务到开机自启
rc-update del <服务名>          # 删除服务的开机自启
rc-update show            # 查看所有开机自启的服务

# 运行级别说明
## boot - 系统启动时运行
## default - 默认运行级别（多用户模式）
## nonetwork - 无网络模式
## single - 单用户模式（维护模式）
rc-update add 服务名 boot      # 核心服务（如docker）
rc-update add 服务名 default    # 普通服务（如nginx、ssh）





tail -f /var/log/messages    # 查看所有系统日志
tail -f /var/log/messages | grep docker    # 查看特定服务的日志
ls /var/log/ | grep -E "(docker|nginx|ssh)"    # 查看服务自己的日志文件（如果有）
```