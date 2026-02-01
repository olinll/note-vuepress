---
title: 安装 JDK 环境
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/app-jdk/
tags:
  - Centos
  - JDK
---

一般情况下，我们不会通过软件包进行安装，而是直接配置环境变量使用

## 下载解压

```bash
# 下载jdk1.8
wget https://cdn.olinl.com/centos/jdk-8u201-linux-x64.tar.gz
## 原地址
# https://repo.huaweicloud.com/java/jdk/8u201-b09/jdk-8u201-linux-x64.tar.gz

#确定安装目录为/opt
# 解压文件夹并移动到opt
tar -zxvf jdk-8u201-linux-x64.tar.gz
mv jdk1.8.0_201 /opt/jdk1.8/

```

## 配置环境

```bash
# 环境配置文件
vim /etc/profile

# 到最下面插入以下内容
# Java1.8
export JAVA_HOME=/opt/jdk1.8
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

# 刷新配置
source /etc/profile

# 验证java版本信息，显示版本号即生效
java -version
```