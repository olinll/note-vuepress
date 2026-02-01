---
title: 签名私服证书
createTime: 2026/02/01 13:13:09
permalink: /note/container/docker/get-cert/
---

在很多时候，我们会把docker私服部署到本地服务器上，而本地服务器的IP地址是不被公网所识别的，所以我们需要给私服部署一个域名，并且为这个域名申请一个证书，这样就可以实现从公网访问到本地的docker私服了。

## Linux

```bash
# 1. 获取Harbor服务器的证书
openssl s_client -connect harbor.chengyun.local:443 -showcerts </dev/null 2>/dev/null | openssl x509 -outform PEM > harbor-cert.pem

# 2. 创建Docker证书目录
sudo mkdir -p /etc/docker/certs.d/harbor.chengyun.local

# 3. 复制证书到Docker信任目录
sudo cp harbor-cert.pem /etc/docker/certs.d/harbor.chengyun.local/ca.crt

# 4. 同时添加到系统CA证书（可选但推荐）
sudo cp harbor-cert.pem /usr/local/share/ca-certificates/harbor.chengyun.local.crt
sudo update-ca-certificates

# 5. 重启Docker服务
sudo systemctl restart docker
```

## Windows

```bash
# 在git Bash中执行以下命令
echo | openssl s_client -connect harbor.chengyun.local:443 -servername harbor.chengyun.local 2>/dev/null | openssl x509 > harbor-ca.crt
```

然后把这个 `harbor-ca.crt` **作为根 CA 安装到“受信任的根证书颁发机构”**

1. 在文件资源管理器中双击 `harbor-ca.crt`
2. 点击 **“安装证书…”**
3. 选择 **“本地计算机”** → 下一步
4. 选择 **“将所有证书放入下列存储”** → 点击“浏览”
5. 选择 **“受信任的根证书颁发机构”** → 确定 → 下一步 → 完成
6. 输入管理员密码（如有）
7. 重启 Docker Desktop
