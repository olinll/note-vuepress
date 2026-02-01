---
title: 系统配置
createTime: 2026/02/01 22:15:54
permalink: /note/linux/ubuntu/ubuntu-config/
---

## root账户设置密码 

```bash
# 通过普通账户登录

# 切换至root用户
sudo su
# 修改root密码
passwd

## PS 此时root可以通过命令行直接登录了，但是不能通过ssh登录，因为ubuntu默认禁止root远程登录，请看下面
```

## SSH配置 允许root远程登录

```bash
# 查看是否安装了SSH服务
ps -ef |grep ssh 

# 没有安装的话，执行下面语句
sudo apt-get update                   #先更新下资源列表
sudo apt-get install openssh-server   #安装openssh-server
sudo ps -ef | grep ssh                #查看是否安装成功
sudo systemctl restart sshd           #重新启动SSH服务 

# 进入ssh配置文件
sudo vim  /etc/ssh/sshd_config
```

**修改Root远程登录权限**

按i进入编辑模式，找到`#PermitRootLogin prohibit-password`，默认是注释掉的。

把 `PermitRootLogin without-password` 改为 `PermitRootLogin yes`，注意`PermitRootLogin without-password`被注释掉了，要去掉注释。如果没有找到`PermitRootLogin without-password`，直接文件末尾添加`PermitRootLogin yes`即可。然后按esc，输入:wq保存并退出。

重启sshd服务

```bash
# 重启ssh服务
sudo systemctl daemon-reload
sudo systemctl restart ssh

# 如果连接不上，禁用防火墙
systemctl stop ufw
```

:::note

`PermitRootLogin` 是一个用于配置 SSH 服务器的选项。这个选项决定了是否允许 root 用户通过 SSH 直接登录到服务器。通常情况下，为了提高安全性，最好禁止 root 用户通过 SSH 直接登录，而是使用一个普通用户登录后再通过 su 或者 sudo 切换到 root 用户来执行需要特权的操作。这样可以降低系统受到攻击的风险。

常见的 PermitRootLogin 选项取值包括：

- `yes`：允许 root 用户通过 SSH 直接登录。
- `no`：禁止 root 用户通过 SSH 直接登录。
- `without-password`：允许 root 用户通过 SSH 密钥登录，但不允许使用密码登录。
:::

## 网络配置

1）打开网络配置文件

```bash
vi /etc/netplan/50-cloud-init.yaml
```

2）在文件中，找到`network`部分，然后根据你的网络设置进行编辑。以下是一个示例配置：

```sql
network:
  version: 2
  ethernets:
    eno1:
      addresses:
      - "192.168.2.21/24"
      nameservers:
        addresses:
        - 192.168.2.1
        - 114.114.114.114
        search: []
      routes:
      - to: "default"
        via: "192.168.2.1"
    eno2:
      addresses:
      - "192.168.2.22/24"
    eno3:
      addresses:
      - "192.168.2.23/24"
    eno4:
      addresses:
      - "192.168.2.24/24"
```

- `eno1` 是网络接口的名称，你需要根据你的实际网络接口名称进行替换。
- `addresses` 是你的服务器的静态IP地址和子网掩码。
- `routes` 是你的网关IP地址。
- `nameservers` 是DNS服务器的IP地址。

3）随后执行命令应用配置更改

```bash
netplan apply
systemctl restart networking
```

4）在22.04中，会启用自动配置，如果你看到配置文件上面有一大堆被注释掉的文字，请取消自动配置

```sql
# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}

```

使用下面的代码根据提示取消自动配置

```bash
sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg << 'EOF'
network: {config: disabled}
EOF
```

5）禁用ipv6（可选）

```bash
# 修改grub
vi /etc/default/grub

# 找到以下行，添加ipv6.disable=1
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"

# 更新GRUB
sudo update-grub
```

## 扩容硬盘

登录进系统，执行lsblk查看分区配置

![](./img/ubuntu-install-894990.png)

可以看到 **/** 目录下才24G，但是上级却有48G，严重不对，现在要进行扩容

![](./img/ubuntu-install-166897.png)

1）使用 `lvextend` 命令扩展逻辑卷：

```bash
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

2）扩展文件系统以使用新增加的空间（假设文件系统是 ext4 或 xfs）：

```bash
# 对于 ext4 文件系统：
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

# 对于 XFS 文件系统：
sudo xfs_growfs /
```

## 防止自动升级版本

修改更新策略

```bash
vi /etc/update-manager/release-upgrades

# 改为
Prompt=never
```

## 换国内源

参考配置 [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

**24.04 LTS**

```bash
# 备份配置文件
mv /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.backup
# 或者直接删除配置文件
#rm /etc/apt/sources.list.d/ubuntu.sources
# 填入下面内容
vim /etc/apt/sources.list.d/ubuntu.sources
```
`ubuntu.sources`
```sql
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# Types: deb-src
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 预发布软件源，不建议启用

# Types: deb
# URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# Suites: noble-proposed
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
# # Suites: noble-proposed
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

**22.04LTS**

```bash
# 备份配置文件
mv /etc/apt/sources.list /etc/apt/sources.list.backup
# 或者直接删除配置文件
#rm /etc/apt/sources.list
# 填入下面内容
vim /etc/apt/sources.list
```
`sources.list`
```sql
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse 
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse 
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse 
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse 

# 预发布软件源，不建议启用 
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

替换源后更新源

```bash
sudo apt update -y
sudo apt upgrade -y
```

最后会弹出一个让你重启服务的框，选择ok就可以，最后最好重启一下系统，将服务全部重启。

## 安装必要软件

```bash
apt install -y zip unzip htop tree iperf3

```

- zip unzip # zip解压工具
- htop # 资源监控工具
- tree # 文件目录查看工具
- iperf3 # 打流测速工具

## 其他

1）nfs协议挂载目录

```bash
# 安装nfs
sudo apt install nfs-common
# 创建挂载目录
mkdir /mnt/appdata

# 测试挂载
mount 10.0.0.10:/mnt/SSD-Storage/appdata/vm-docker /mnt/appdata
# 取消挂载
umount /mnt/appdata

# 开机自动挂载目录
vim /etc/fstab
# 添加以下内容
10.0.0.10:/mnt/SSD-Storage/appdata/vm-docker /mnt/appdata nfs defaults 0 0
```