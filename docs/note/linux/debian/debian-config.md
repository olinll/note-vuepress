---
title: 配置系统
createTime: 2026/02/02 23:38:50
permalink: /note/linux/debian/debian-config/
---
## 将当前用户添加进sudo组

```bash
sudo usermod -aG sudo xc
```

## Root 账户允许远程登录

```bash
# 查看是否安装了SSH服务
ps -ef |grep ssh 

# 没有安装的话，执行下面语句
sudo apt-get update                   #先更新下资源列表
sudo apt-get install openssh-server   #安装openssh-server
sudo ps -ef | grep ssh                #查看是否安装成功
sudo systemctl restart sshd           #重新启动SSH服务 

# 进入ssh配置文件
vi  /etc/ssh/sshd_config
```

**修改Root远程登录权限**

```bash title="/etc/ssh/sshd_config"
#PermitRootLogin prohibit-password
PermitRootLogin yes # [!code ++]
```

:::tip

`PermitRootLogin` 是一个用于配置 SSH 服务器的选项。这个选项决定了是否允许 root 用户通过 SSH 直接登录到服务器。通常情况下，为了提高安全性，最好禁止 root 用户通过 SSH 直接登录，而是使用一个普通用户登录后再通过 su 或者 sudo 切换到 root 用户来执行需要特权的操作。这样可以降低系统受到攻击的风险。

常见的 PermitRootLogin 选项取值包括：

- `yes`：允许 root 用户通过 SSH 直接登录。
- `no`：禁止 root 用户通过 SSH 直接登录。
- `without-password`：允许 root 用户通过 SSH 密钥登录，但不允许使用密码登录。

:::

**重启服务**

```bash
# 重启ssh服务
sudo systemctl daemon-reload
sudo systemctl restart ssh
```

## 换国内源

因为我们已经在安装的时候选择清华大学源了，所以这里只需要将 CD-ROM 部分注释或者删除就可以了

```bash title="/etc/apt/sources.list"
$ # [!code error] 注释或者删除 该行
deb cdrom:[Debian GNU/Linux 13.3.0 _Trixie_ - Official amd64 DVD Binary-1 with firmware 20260110-11:00]/ trixie contrib main non-free-firmware # [!code error]

deb http://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main non-free-firmware
deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main non-free-firmware

deb http://security.debian.org/debian-security trixie-security main non-free-firmware
deb-src http://security.debian.org/debian-security trixie-security main non-free-firmware

# trixie-updates, to get updates before a point release is made;
# see https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_updates_and_backports
deb http://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main non-free-firmware
deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main non-free-firmware

```

更新系统及其软件包

```bash
apt update
apt upgrade
```

## 安装必要软件

```bash
apt install wget curl vim zip unzip lsb-release tree htop net-tools lsof chrony tar lvm2 parted -y
```

**安装 Intel 显卡工具包**
```bash
apt install vainfo intel-gpu-tools -y
```

:::note

- **wget**：用于从命令行下载文件，适合脚本和大文件拉取
- **curl**：用于发起 HTTP/API 请求，常用于接口测试和自动化
- **vim**：终端下的文本编辑器，用于修改配置和编写脚本
- **zip**：将文件打包成 zip 格式，方便跨平台传输
- **unzip**：解压 zip 压缩包
- **lsb-release**：用于识别当前 Linux 发行版和版本信息
- **tree**：以树状结构显示目录内容
- **htop**：交互式进程监控工具，用于查看 CPU 和内存使用情况
- **net-tools**：提供 netstat、ifconfig 等传统网络排错工具
- **lsof**：查看端口或文件被哪个进程占用
- **chrony**：高精度时间同步服务，保证系统时间准确
- **tar**：Linux 常用的打包和解包工具
- **lvm2**: 磁盘管理工具
- **parted**:磁盘管理工具

:::

## 安装 SR-IOV 核显驱动

```bash

nano /etc/default/grub

# 在GRUB_CMDLINE_LINUX_DEFAULT后面加上 i915.enable_guc=3
GRUB_CMDLINE_LINUX_DEFAULT="quiet" # [!code --]
GRUB_CMDLINE_LINUX_DEFAULT="quiet i915.enable_guc=3" # [!code ++]

# 更新grub
update-grub

# 安装相关环境和依赖包
apt install -y dkms vainfo intel-media-va-driver wget firmware-linux linux-headers-$(uname -r)

# 下载sriov驱动
# https://github.com/strongtz/i915-sriov-dkms
wget https://github.com/strongtz/i915-sriov-dkms/releases/download/2025.12.10/i915-sriov-dkms_2025.12.10_amd64.deb

# 安装sriov驱动
sudo dpkg -i i915-sriov-dkms_*_amd64.deb

# 重启
reboot

···
