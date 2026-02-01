---
title: 备份与恢复
createTime: 2026/02/01 21:56:21
permalink: /note/devops/installapp/postgresql/pgsql-backup/
---

## 备份与恢复整个数据库

### 使用超级用户（通常是 postgres）导出整个集群

```bash
sudo -u postgres pg_dumpall -h localhost -p 5432 -v > /tmp/pg_full_backup.sql
```

### 将备份文件拷贝到目标服务器

```bash
rsync -avz --progress /tmp/pg_full_backup.sql huanfa@192.168.2.21:/tmp/
```

### 恢复数据库

```bash
# 实体PostgreSQL  
sudo -u postgres psql -f /tmp/pg_full_backup.sql  
  
# 容器PostgreSQL  
## 复制进容器  
docker cp /tmp/pg_full_backup.sql pg-migrated:/tmp/  
## 执行恢复（使用 psql）  
docker exec -i pg-migrated psql -U postgres -f /tmp/pg_full_backup.sql
```

## 备份与恢复一个数据表

### 备份单个表

```bash
# 使用超级用户（postgres）备份指定表  
sudo -u postgres pg_dump -h localhost -p 5432 -d your_database_name -t your_table_name -v > /tmp/table_backup.sql  
  
# 示例：备份 mydb 数据库中的 users 表  
#sudo -u postgres pg_dump -h localhost -p 5432 -d mydb -t users -v > /tmp/users_backup.sql  
  
# 可选：备份时包含删除和创建语句（便于重复恢复）  
#sudo -u postgres pg_dump -h localhost -p 5432 -d mydb -t users --clean --if-exists -v > /tmp/users_backup_clean.sql
```

### 将备份文件拷贝到目标服务器

```bash
rsync -avz --progress /tmp/users_backup.sql huanfa@192.168.2.21:/tmp/  
  
# 如果需要同时备份多个表  
rsync -avz --progress /tmp/*_backup.sql huanfa@192.168.2.21:/tmp/
```

### 恢复单个表到目标数据库  

如果表已存在，需要先将表删除或者改名

```bash
# 实体PostgreSQL  
sudo -u postgres psql -d target_database -f /tmp/users_backup.sql  
## 如果表已存在，需要先将表删除或者改名  
  
# 容器PostgreSQL  
## 复制进容器  
docker cp /tmp/users_backup.sql pg-migrated:/tmp/  
## 执行恢复（使用 psql）  
docker exec -i pg-migrated psql -U postgres -d target_database -f /tmp/users_backup.sql
```