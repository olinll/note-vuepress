---
title: 系统安装
createTime: 2026/02/02 22:50:02
permalink: /note/linux/debian/debian-install/
---
## 下载镜像

国内用户推荐在「清华大学开源软件镜像站」的 [debian-cd 专属页面](https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/)，找到与你「设备架构」相匹配的 Debian 13 ISO 镜像，然后自行下载。

:::note

建议根据你的设备架构，选择`iso-dvd`完整安装镜像。

:::

amd 架构链接：[AMD - ISO DVD](https://mirrors.tuna.tsinghua.edu.cn/debian-cd/current/amd64/iso-dvd/)

## 开始安装

### 选择安装类型

在 Debian 安装程序菜单中，选择 「**Graphical Install**」，以图形化界面启动 Debian 13 安装向导。

![选择安装类型](./img/debian-install-710246.png)

### 选择语言

选择「安装向导」和系统中要使用的语言，然后点击「Continue」继续。国内的小伙伴选择「**中文（简体）**」即可。

![选择语言](./img/debian-install-201960.png)

### 选择你的位置

选择你所在的地理位置，系统会以此自动为 Debian 13 设置时区。

![选择位置](./img/debian-install-763428.png)

### 配置键盘

在列表中选择与你「实体键盘」相匹配的键盘布局，然后点击「继续」。

![配置键盘](./img/debian-install-596146.png)

### 网络配置

在安装过程中，Debian 安装程序会尝试通过 DHCP 服务器，自动获取 IP 地址来配置网络：

- 如果获取成功，就会直接跳到「主机名」设置（这在安装「桌面版」时比较适用）。如果是安装 Debian 服务器，**可以在「主机名」设置界面点击「返回」，手动指定固定 IP**。
- 如果网络中没有可用的 DHCP 服务器，自动配置将会失败，也需要你手动指定 IP 地址。
::: warning

如果你的网络中有 DHCP 服务器，系统自动配置了，可以点击返回按钮，选择返回，然后按照下面教程继续即可

![](./img/debian-install-748551.png)

:::
#### 手动配置网络

1. 选择「手动配置网络」，然后点击「继续」。

![](./img/debian-install-264800.png)

2. 输入一个固定 IP 地址，然后点击「继续」。

:::note

可以在这里输入 IP 地址/子网掩码，例如 `192.168.1.2/24`

或者只输入 IP 地址，在后面配置子网掩码

:::

![](./img/debian-install-862048.png)

3. 输入网关 IP 地址，然后点击「继续」。通常会自动配置。

![](./img/debian-install-333368.png)

4. 输入 DNS 服务器，然后点击「继续」。如何要配置多个 DNS 服务器，可以用「空格」隔开。

![](./img/debian-install-670686.png)

5. 为你的 Debian 13 系统设置一个 `hostname` 主机名，然后点击「继续」。

![](./img/debian-install-920560.png)

6. 如果你有与网络关联的特定「域名」，可以在这里输入。一般情况下，我们会选择「留空」。

![](./img/debian-install-704376.png)

### 设置 Root 密码

为`root`帐户设置一个强密码。

![](./img/debian-install-587634.png)

::: info 强密码的标准

| 要求  | 说明                              |
| --- | ------------------------------- |
| 长度  | 至少 8 位字符                        |
| 复杂性 | 包含大小写字母、数字和特殊字符（如`@`、`#`、`$`等）。 |
| 安全性 | 避免重复使用或容易被猜到的密码                 |

:::

### 创建新用户和密码

强烈建议你创建一个普通用户账户，作为日常操作使用。只在需要权限时再临时提权。

1. 输入新用户的全名，然后点击「继续」。可以和下一步的「用户名」不同。

![](./img/debian-install-669571.png)

2. 为这个用户设置一个用户名，只能用小写字母和数字，而且必须以字母开头。

![](./img/debian-install-875373.png)

3. 为新用户设置一个强密码，最好是和 `root` 密码不同。

![](./img/debian-install-416543.png)

### 对磁盘进行分区

在这一步，我们要规划磁盘分区，主要有以下 4 个选项：

| 分区选项                  | 描述                               |
| --------------------- | -------------------------------- |
| 向导 – 使用整个磁盘           | 自动对整个磁盘进行分区，适合新手和 Homelab 虚拟机使用。 |
| 向导 – 使用整个磁盘并配置 LVM    | 自动设置 LVM 分区。                     |
| 向导 – 使用整个磁盘并配置加密的 LVM | 自动设置加密的 LVM 分区。                  |
| 手动                    | 自定义分区，自由度最高，适合有经验的用户。            |

通常我们选择 1 或者 2 即可

我这里推荐使用 LVM 进行分区

![](./img/debian-install-557392.png)

选择你要分区的硬盘

![](./img/debian-install-327772.png)

如果没有特殊需求，推荐选择「将所有文件放在同一个分区中」，你也可以将`/home`、`/var`和`/tmp`等目录单独分区。

![](./img/debian-install-755278.png)

:::tip

这里如果硬盘不是空的，会提示下面内容，我们直接选择是即可。

![](./img/debian-install-709516.png)



:::

选择「是」确认将修改写入磁盘并配置 LVM

![](./img/debian-install-802899.png)

这里默认保持最大空间即可

![](./img/debian-install-555712.png)

完成分区操作并将修改写入磁盘

![](./img/debian-install-940129.png)

选择「是」确认将改动写入磁盘，然后点击「继续」。

![](./img/debian-install-602194.png)

### 开始安装基本系统

![](./img/debian-install-365668.png)

### 配置软件包管理器：更新源

安装向导会询问你是否扫描额外的安装介质，选择「否」继续。

![](./img/debian-install-527438.png)

选择「是」，启用网络镜像。（配置一个快速的国内源，对国内的小伙伴非常重要。）

![](./img/debian-install-285339.png)

国家选择「中国」，Debian 仓库镜像站点推荐选择 `tsinghua` 清华源。


![](./img/debian-install-195050.png)![](./img/debian-install-876653.png)


如果你是直连网络，HTTP 代理信息就「留空」；如果有代理，就填写代理地址和端口号。

![](./img/debian-install-373349.png)

启用「软件包流行度调查」后，Debian 会定期收集你的软件使用数据。如果你不想参与，就选择「否」。

:::tip

你也可以随时在「终端」中，执行以下命令来调整设置：

```bash
dpkg-reconfigure popularity-contest
```

:::

![](./img/debian-install-369588.png)

### 软件选择：桌面版还是服务器

Debian 是一款通用型 Linux 发行版，它不像 Ubuntu 那样，还单独区分桌面和服务器版本的 ISO 镜像。但你可以在「软件选择」时，来决定安装哪种类型：

- 勾选「Debian 桌面环境」，并至少选择一款桌面，就会安装桌面版。
- 如果不选「Debian 桌面环境」，那就是服务器版。

选择要安装的软件，推荐勾选上：

- **SSH server**：安装 SSH 服务器，方便远程管理。Homelab 环境可以启用 root 登录。
- **标准系统工具**：包括一些常用的基础工具包、命令行工具、网络工具和系统管理工具等。
- **Blends**：适用于教育、科研等特定场景的软件合集。

![](./img/debian-install-968123.png)

选择完毕后，点击「继续」，开始安装这些软件。

![](./img/debian-install-278013.png)

### 安装 GRUB 启动引导器

选择「是」继续安装 GRUB 启动引导器。

![](./img/debian-install-135285.png)

选择要安装 GRUB 的磁盘，比如`/dev/sda`，然后点击「继续」。

![](./img/debian-install-556969.png)

最后,点击「继续」重启系统，完成 Debian 13 安装流程。

![](./img/debian-install-910918.png)

恭喜！Debian 13 安装教程到这里就结束了。通过这份一步步的图文指南，你可以轻松完成 Debian 13 服务器或桌面版的安装。系统重启并完成（桌面版）初始设置后，就可以开始正常使用了。