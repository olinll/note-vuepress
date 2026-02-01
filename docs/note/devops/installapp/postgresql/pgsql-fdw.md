---
title: 外部表应用
createTime: 2026/02/01 21:54:26
permalink: /note/devops/installapp/postgresql/pgsql-fdw/
---

## 配置外部数据库

因为postgreSQL不能跨库查询，所以我们可以使用外部数据包装器（Foreign Data Wrapper，简称 FDW）访问的外部数据源。

### 安装扩展

```sql
-- 在本地数据库执行  
CREATE EXTENSION IF NOT EXISTS postgres_fdw;
```

### 创建远程服务器连接

```sql
-- 创建服务器配置  
CREATE SERVER remote_server_hf_cy -- 外部服务器名称  
FOREIGN DATA WRAPPER postgres_fdw  
OPTIONS (  
host '172.172.254.200', -- 远程IP  
dbname 'hf_cy', -- 远程数据库名  
port '6432' -- 远程端口  
);
```

### 创建用户映射

```sql
-- 设置认证信息  
CREATE USER MAPPING FOR postgres  
SERVER remote_server_hf_cy -- 外部服务器名称  
OPTIONS (  
user 'postgres', -- 远程数据库用户名  
password 'huanfaCypatroni' -- 远程数据库密码  
);
```

### 导入远程表

**方式1：导入单个表**

```sql
-- 导入指定表到本地public schema  
IMPORT FOREIGN SCHEMA public  
LIMIT TO (hf_cy_approval_role) -- 只导入这个表  
FROM SERVER remote_server_hf_cy -- 外部服务器名称  
INTO public;
```

**方式2：导入多个表**

```sql
-- 导入多个表  
IMPORT FOREIGN SCHEMA public  
LIMIT TO (table1, table2, table3) -- 逗号分隔表名  
FROM SERVER remote_server_hf_cy -- 外部服务器名称  
INTO public;
```

**方式3：导入整个schema（慎用）**

```sql
-- 导入整个public schema的所有表  
IMPORT FOREIGN SCHEMA public  
FROM SERVER remote_server_hf_cy -- 外部服务器名称  
INTO public;
```

### 使用导入的表

和正常的表一样使用  

### 常用管理命令

**查看配置**

```sql
-- 查看所有外部服务器  
SELECT * FROM pg_foreign_server;  
  
-- 查看导入的外部表  
SELECT * FROM information_schema.foreign_tables;  
  
-- 查看表结构  
\d hf_cy_approval_role;
```

**修改配置**

```sql
-- 修改服务器选项  
ALTER SERVER remote_server OPTIONS (  
ADD fetch_size '50000' -- 增加每次获取的行数  
);  
  
-- 修改参数  
ALTER SERVER basic_db_server  
OPTIONS (SET host '192.168.2.21', SET port '5432', SET dbname 'hf_cy_basic_biz');  
  
  
-- 修改密码  
ALTER USER MAPPING FOR CURRENT_USER  
SERVER basic_db_server  
OPTIONS (  
SET password 'Yanfa@DB'  
);
```

**删除配置**

```sql
-- 删除单个外部表  
DROP FOREIGN TABLE hf_cy_approval_role;  
  
-- 删除用户映射  
DROP USER MAPPING FOR postgres SERVER remote_server;  
  
-- 删除服务器  
DROP SERVER remote_server CASCADE;  
  
-- 删除扩展  
DROP EXTENSION postgres_fdw;
```