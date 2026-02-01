---
title: 安装 Samba 服务
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-samba/
tags:
  - Centos
  - Samba
---

> Samba 是一个开源的软件，它实现了 SMB/CIFS 协议，允许在不同操作系统之间共享文件和打印机。

# 安装

安装前请确保SELinux已关闭，

```bash
# 查看是否关闭SELinux
getenforce

# 关闭SELinux
vim /etc/sysconfig/selinux #SELINUX=enforcing 改成 SELINUX=disable

# 关闭防火墙
systemctl stop firewalld.service
systemctl disable firewalld.service
```

```bash
# 安装samba服务
yum install -y samba samba-client
```

# 配置服务

```bash
# 编辑配置文件，共享/var/www/html/目录
mv /etc/samba/smb.conf /etc/samba/smb.conf.bak
vim /etc/samba/smb.con
## 在这里插入
 [share]
    comment = It is a test
    path = /var/www/html
    browseable = yes
    writable = yes 


# 创建共享用户
useradd van
smbpasswd -a van
#输入 密码
pdbedit -L #查看共享用户


# 启动服务
systemctl start smb # 启动服务
systemctl enable smb # 开机自启

ss -antp | grep smbd #查看是否运行

# 设置目录的本地权限
setfacl -m u:root:rwx /var/www/html
setfacl -m u:(用户):rwx /(目录)
```