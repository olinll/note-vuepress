---
title: 安装 Frp 服务
createTime: 2026/02/01 13:29:15
permalink: /note/linux/alpine/app-frp/
---

Frp 是一个反向代理工具，它可以将本地服务暴露到公网，实现远程访问。

下载frp：https://github.com/fatedier/frp/releases

如果网络不好可以使用gh镜像站点

```bash
wget https://github.com/fatedier/frp/releases/download/v0.67.0/frp_0.67.0_linux_amd64.tar.gz
```



```bash title="frpc"
# 创建 OpenRC 服务文件
tee /etc/init.d/frpc <<'EOF'
#!/sbin/openrc-run

name="frp client"
description="FRP Client Service"
command="/opt/frp/frpc"
command_args="-c /opt/frp/frpc.toml"
command_user="root"
command_background=true
pidfile="/run/${RC_SVCNAME}.pid"

depend() {
    need net
    after firewall
}

start_pre() {
    checkpath --directory --owner ${command_user}:${command_user} /run/${RC_SVCNAME}
}

stop_post() {
    rm -rf /run/${RC_SVCNAME}
}
EOF

# 设置权限并添加服务
chmod +x /etc/init.d/frpc

# 启动服务
rc-service frpc start

# 停止服务
rc-service frpc stop

# 查看状态
rc-service frpc status

# 重启服务
rc-service frpc restart


# 开机自启
rc-update add frpc default

```

```bash title="frps"
# 创建 OpenRC 服务文件
tee /etc/init.d/frps <<'EOF'
#!/sbin/openrc-run

name="frp server"
description="FRP Server Service"
command="/opt/frp/frps"
command_args="-c /opt/frp/frps.toml"
command_user="root"
command_background=true
pidfile="/run/${RC_SVCNAME}.pid"

depend() {
    need net
    after firewall
}

start_pre() {
    checkpath --directory --owner ${command_user}:${command_user} /run/${RC_SVCNAME}
}

stop_post() {
    rm -rf /run/${RC_SVCNAME}
}
EOF

# 设置权限并添加服务
chmod +x /etc/init.d/frps

# 启动服务
rc-service frps start

# 停止服务
rc-service frps stop

# 查看状态
rc-service frps status

# 重启服务
rc-service frps restart


# 开机自启
rc-update add frps default

```
