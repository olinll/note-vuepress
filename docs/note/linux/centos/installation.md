---
title: 系统安装
createTime: 2026/01/31 23:11:03
permalink: /note/linux/centos/installation/
tags:
  - Centos
---
::: note

**Centos停更说明：**

CentOS操作系统已全面停止维护（EOL），继续使用会使系统暴露在新的安全漏洞之下，成为攻击目标，并可能违反相关安全合规要求。

阿里云：[Centos 操作系统](https://help.aliyun.com/zh/ecs/user-guide/options-for-dealing-with-centos-linux-end-of-life)

:::

# 下载镜像

Centos7镜像包：

```sql
https://cdn.olinl.com/centos/CentOS-7-x86_64-DVD-2009.iso
```

烧录镜像（二选一）

- 使用 [Vertoy启动盘](https://www.ventoy.net/cn/index.html)
- 使用 [Rufus](https://rufus.ie/zh/)
- 或者第三方镜像烧录工具
之后启动到U盘，进入安装流程，里面没什么可说的，都是可视化安装，下一步下一步即可。

# 开始安装

网络配置可以在安装界面配置，也可以使用dhcp 在安装完成后配置，但是开关一定要打开，不然无法使用SSH连接，如果在安装的时候没有网络，也可以关闭，然后后面手动开启网卡服务。

![配置静态ip](./img/centos-all-335018.png)

如果root密码设置过于简单，需要点击两次完成才可继续安装。
