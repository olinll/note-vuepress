---
title: 配置
createTime: 2026/02/01 21:52:48
permalink: /note/devops/installapp/postgresql/pgsql-config/
---

## 配置远程访问

PostgreSQL 通过一个名为**角色**的概念支持多种客户端身份验证方法。默认的身份验证方法是**身份验证**，它将 Postgres 角色与 Unix 系统帐户关联起来。所有受支持的身份验证方法有：

- **Ident** – 仅支持通过 TCP/IP 连接。它通过可选的用户名映射获取客户端系统用户名。
- **密码** – 角色使用密码进行连接。
- **Peer** – 与 ident 类似，但仅支持本地连接。
- **信任** – 只要满足 _**pg_hba.conf**_ 中定义的条件，就允许角色进行连接。

为了远程访问我们的数据库服务器实例，我们应该在文件 **/etc/postgresql/14/main/pg_hba.conf** 中进行更改。

通过运行以下命令允许在 PostgreSQL 服务器上进行密码身份验证。

```bash
sudo sed -i '/^host/s/ident/md5/' /etc/postgresql/14/main/pg_hba.conf
```

接下来是将识别方法从对等更改为***信任***，如下所示。

```bash
sudo sed -i '/^local/s/peer/trust/' /etc/postgresql/14/main/pg_hba.conf
```

要允许从任何地方访问实例，请编辑命令如下：

```bash
sudo vim /etc/postgresql/14/main/pg_hba.conf
```

在该文件中，添加以下行。

```sql
# IPv4 local connections:  
host   all             all             0.0.0.0/0               md5  
```

现在，通过如下编辑 **/etc/postgresql/14/main/postgresql.conf** 中的 conf 文件来确保服务正在侦听 。

```bash
sudo vim /etc/postgresql/14/main/postgresql.conf
```

在文件中，取消注释并编辑该行，如下所示。

```sql
#------------------------------------------------------------------------------  
# CONNECTIONS AND AUTHENTICATION  
#-----------------------------------------------------------------------------  
.......  
listen_addresses='*'
```

现在重新启动并启用 PostgreSQL 以使更改生效。

```bash
sudo systemctl restart postgresql  
sudo systemctl enable postgresql
```

## 数据目录迁移/修改

如果我们需要将数据目录从默认位置迁移到其他位置，我们可以按照以下步骤操作。

```bash
# 停止PostgreSQL  
systemctl stop postgresql  
  
# 拷贝原来的数据路径到新的路径下  
cp -rf /var/lib/postgresql/14/main /opt/postgresql/  
  
# 设置用户和权限  
chown -R postgres:postgres /opt/postgresql/  
chmod 700 /opt/postgresql/  
  
# 将配置文件的数据存储路径改成新的  
vim /etc/postgresql/14/main/postgresql.conf  
data_directory='/app/postgresql/'  
  
# 再启动即可  
systemctl start postgresql  
  
# 查看当前数据目录  
psql -U postgres  
  
postgres=# show data_directory;  
data_directory  
-----------------------------  
/var/lib/postgresql/14/main  
(1 row)
```