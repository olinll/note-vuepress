---
title: 安装 MySQL 5.7
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-mysql/
tags:
  - Centos
  - MySQL
---

采用官网rpm包安装，版本为5.7的最后一个版本

## 下载解压

获取下载链接，可以使用本站 cdn 地址

```sql
# 全量包
https://cdn.olinl.com/centos/mysql-5.7.43-1.el7.x86_64.rpm-bundle.tar

# 只包含必须安装的包
https://cdn.olinl.com/centos/mysql-5.7.43-1.el7.x86_64.rpm-bundle-lite.tar
```

打开mysql 社区版下载网站：[https://downloads.mysql.com/archives/community](https://downloads.mysql.com/archives/community)

CentOS 是基于红帽的，Select OS Version: 选择 linux 7，如下图

![下载MySQL镜像](./img/centos-all-010317.png)

复制地址：

```bash
# 官网mysql 5.7 地址
https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.44-1.el7.x86_64.rpm-bundle.tar
```

下载并解压

```bash
# 下载包 
wget https://cdn.olinl.com/centos/mysql-5.7.44-1.el7.x86_64.rpm-bundle-lite.tar # 精简包
# wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.44-1.el7.x86_64.rpm-bundle.tar # 官网
# wget https://cdn.olinl.com/centos/mysql-5.7.44-1.el7.x86_64.rpm-bundle.tar # 全量cdn

# 解压压缩包
tar -xvf mysql-8.0.27-1.el7.x86_64.rpm*.tar
```

## 安装并配置

```bash
# 安装必要软件包
rpm -ivh mysql-community-common-5.7*.x86_64.rpm --nodeps --force
rpm -ivh mysql-community-libs-5.7*.x86_64.rpm --nodeps --force
rpm -ivh mysql-community-client-5.7*.x86_64.rpm --nodeps --force
rpm -ivh mysql-community-server-5.7*.x86_64.rpm --nodeps --force

# 查看已安装的mysql
rpm -qa | grep mysql
```

**初始化mysql，并开启服务**(常规做法)

这里是使用默认目录，默认的配置，自定义目录请看下面

```bash
# 初始化mysql
mysqld --initialize;
# 给数据目录权限
chown mysql:mysql /var/lib/mysql -R;
# 启动服务
systemctl start mysqld.service;
# 设置自启动
systemctl enable mysqld;

# 查看密码
cat /var/log/mysqld.log | grep password

# 登录并修改密码
mysql -uroot -p
## 输入上面获取的密码
## 修改密码并刷新配置
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
```

**初始化mysql，使用自定义数据目录，并配置文件**

这里使用自定义数据目录，`/opt/mysql/data`

注意：设置自定义目录要禁用SELinux

```bash
# 创建数据目录
mkdir -p /opt/mysql/data
# 修改my.cnf文件

# 修改数据目录
datadir=/opt/mysql/data
# 修改日志目录
log-error=/opt/mysql/mysqld.log
# 修改socket
socket=/opt/mysql/mysql.sock

# 给数据目录赋权
chmod -R 777 /opt/mysql/*
chmod -R 777 /opt/mysql/data/*
chown mysql:mysql /opt/mysql -R;
chown mysql:mysql /opt/mysql/data -R;
chown mysql:mysql /var/lib/mysql -R;



# 使用mysql用户初始化
sudo -u mysql mysqld --initialize --datadir=/opt/mysql/data
# 启动服务
systemctl start mysqld.service;
# 设置自启动
systemctl enable mysqld;

# 查看密码 下面的log需要替换成新的log文件
cat /opt/mysql/mysqld.log | grep password

# 登录并修改密码
mysql -uroot -p
## 输入上面获取的密码
## 修改密码并刷新配置
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
```

**设置外部访问**

mysql安装成功后，root的只能localhost登录，需要修改为% 所有域都可访问

**修改root用户(不推荐)**

```sql
#  登录
mysql -uroot -p

#  修改用户表
update user set host = '%' where user ='root';
#  刷新配置
flush privileges;
```

**创建一个允许外部访问的用户**

```bash
# 登录
mysql -uroot -p

# 修改用户表
CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
# 刷新配置
flush privileges;
```