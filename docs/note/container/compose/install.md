---
title: 安装 Compose
createTime: 2026/02/01 13:45:41
permalink: /note/container/compose/install/
---
Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。  

Linux 上我们可以从 Github 上下载它的二进制包来使用，最新发行的版本地址：  https://github.com/docker/compose/releases

运行以下命令以下载 Docker Compose 的当前稳定版本：  

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v5.0.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

要安装其他版本的 Compose，请替换v5.0.1

```bash
# 将可执行权限应用于二进制文件
sudo chmod +x /usr/local/bin/docker-compose

# 创建软链（可选）
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# 测试是否安装成功
docker-compose version
cker-compose version 1.24.1, build 4667896b
```