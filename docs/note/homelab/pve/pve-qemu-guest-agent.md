---
title: 开启QEMU Guest Agent
createTime: 2026/02/01 21:58:42
permalink: /note/homelab/pve/pve-qemu-guest-agent/
---
pve虚拟机安装guest agent，使web平台可以直接显示虚拟机的ip，方便管理。


## Ubuntu

```shell
apt install -y qemu-guest-agent

systemctl enable qemu-guest-agent
systemctl start qemu-guest-agent
systemctl status qemu-guest-agent
```