---
title: 安装 Nexus 私服
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-nexus/
tags:
  - Centos
  - Nexus
---

> Nexus 是用来搭建 Maven 私服的，可以说是最好的免费工具了，它的官网上是这样说的：“世界上第一个也是唯一的免费使用的仓库解决方案”。提供了针对 Windows、Unix、OS X 三种系统的版本。

这里只简单说明 Linux 下的安装方式，如果是下载的最新版本，它对系统内存和 jdk 版本是有要求的，要求内存大于`4G`，jdk 最低是`1.8`版本。

# 安装

Nexus官网：[https://www.sonatype.com/download-oss-sonatype](https://www.sonatype.com/download-oss-sonatype)

下载完Nexus上传到服务器上面，或者使用本站cdn搭配wget一键下载

```sql
wget https://cdn.olinl.com/centos/nexus-3.87.1-01-linux-x86_64.tar
```

安装目录 `/opt/Nexus`

```bash
# 解压
tar -zxvf nexus-3.87.1-01-linux-x86_64.tar.gz
# 进入目录并启动
cd nexus-3.87.1-01/bin
./nexus start
```

nexus 命令说明

```bash
./nexus start  # 启动 Nexus 服务  后台运行
./nexus stop  # 停止 Nexus  
./nexus restart  # 重启服务  
./nexus status  # 查看运行状态  显示 PID 和是否运行
./nexus run  # 前台运行（调试用）
```

如果有问题，并且提示“ NOT RECOMMENDED TO RUN AS ROOT ”，可以通过修改 `/bin/nexus` 文件，在其中加入 `RUN_AS_USER=root` ，然后重新启动即可。

如果提示

```sql
WARNING: ****  
WARNING: Detected execution as "root" user. This is NOT recommended!  
WARNING: **
```

**需要创建专用用户，然后运行**

```bash
# 创建系统用户 'nexus'，主目录设为 Nexus 安装目录（按你的实际路径调整）
sudo useradd -r -s /sbin/nologin -U -m -d /opt/nexus nexus

# 假设 Nexus 安装在 /opt/nexus
sudo chown -R nexus:nexus /opt/nexus

# 假设数据目录是 /opt/sonatype-work（默认在安装目录同级）
sudo chown -R nexus:nexus /opt/sonatype-work
```

**使用root用户运行**

```bash
# 以 nexus 用户身份执行（root 可以这样做）
sudo -u nexus /opt/nexus/bin/nexus run
```

**使用systemctl控制**

配置 systemd 服务（由 root 启动，但以 nexus 用户运行）

```sql title="/etc/systemd/system/nexus.service"
[Unit]
Description=Nexus Repository Manager
After=network.target

[Service]
Type=forking
User=nexus
Group=nexus
ExecStart=/opt/nexus/bin/nexus start
ExecStop=/opt/nexus/bin/nexus stop
Restart=on-failure
RestartSec=10
LimitNOFILE=65536
Environment=JAVA_HOME=/usr/lib/jvm/java-11-openjdk  # 按实际 Java 路径调整

[Install]
WantedBy=multi-user.target
```

```bash
# 重载 systemd 配置
sudo systemctl daemon-reload

# 开机自启
sudo systemctl enable nexus

# 启动服务（此时 root 触发，但进程是 nexus 用户）
sudo systemctl start nexus

# 验证是否成功
ps aux | grep nexus
sudo systemctl status nexus
```
