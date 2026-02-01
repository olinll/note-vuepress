---
title: 目录
createTime: 2026/02/01 22:34:56
permalink: /note/guid/
---

<style>
.note-guid-list h2 {
  margin-top: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.guid-group-title {
  margin: 1.5rem 0 0.8rem;
  font-weight: 600;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
}
.guid-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.guid-item {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.25s;
  font-size: 0.9rem;
  color: var(--vp-c-text-1) !important;
  line-height: 1.4;
}
.guid-item:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.guid-separator {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 1.5rem 0;
  opacity: 0.6;
}
</style>

<div class="note-guid-list">

## <Icon name="line-md:folder-multiple-filled" /> 容器化

<div class="guid-group-title"><Icon name="line-md:list" /> Docker</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/container/docker/installation">安装 Docker</RouterLink>
<RouterLink class="guid-item" to="/note/container/docker/prod-config">生产环境配置</RouterLink>
<RouterLink class="guid-item" to="/note/container/docker/get-cert">签名私服证书</RouterLink>
<RouterLink class="guid-item" to="/note/container/docker/docker-bash">操作命令</RouterLink>
<RouterLink class="guid-item" to="/note/container/docker/uninstall">卸载 Docker</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Docker Compose</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/container/compose/install">安装 Compose</RouterLink>
<RouterLink class="guid-item" to="/note/container/compose/bash-compose">常用命令</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Kubernetes</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/container/kubernetes/kubesphere-install">离线安装 KubeSphere 4.1</RouterLink>
<RouterLink class="guid-item" to="/note/container/kubernetes/kubernetes-upd-dir">Kubernetes 修改数据目录</RouterLink>
<RouterLink class="guid-item" to="/note/container/kubernetes/kubelet-upd-dir">修改 Kubelet 默认工作目录</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> 项目推荐</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/container/star/memos">Memos 笔记</RouterLink>
<RouterLink class="guid-item" to="/note/container/star/sum-panel">Sun-Panel面板</RouterLink>
<RouterLink class="guid-item" to="/note/container/star/uptime-kuma">Uptime Kuma 监控服务</RouterLink>
</div>

## <Icon name="line-md:folder-multiple-filled" /> Linux 系统

<div class="guid-group-title"><RouterLink to="/note/linux/centos/" style="color: inherit; text-decoration: none;"><Icon name="line-md:list" /> Centos</RouterLink></div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/linux/centos/installation">系统安装</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/optimize">系统优化</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-jdk">安装 JDK 环境</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-maven">安装 Maven 环境</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-nginx">安装 Nginx</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-redis">安装 Redis</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-mysql">安装 MySQL 5.7</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-docker">安装 Docker</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-squid">安装 Squid 代理服务</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-nexus">安装 Nexus 私服</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-kafka">安装 Kafka</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-mongodb">安装 MongoDB</RouterLink>
<RouterLink class="guid-item" to="/note/linux/centos/app-samba">安装 Samba 服务</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Ubuntu</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/linux/ubuntu/ubuntu-install">安装 Ubuntu Server</RouterLink>
<RouterLink class="guid-item" to="/note/linux/ubuntu/ubuntu-config">系统配置</RouterLink>
<RouterLink class="guid-item" to="/note/linux/ubuntu/ubuntu-mysql">安装 MySQL 8.1</RouterLink>
</div>

<div class="guid-group-title"><RouterLink to="/note/linux/alpine/" style="color: inherit; text-decoration: none;"><Icon name="line-md:list" /> Alpine</RouterLink></div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/linux/alpine/install">安装 Alpine</RouterLink>
<RouterLink class="guid-item" to="/note/linux/alpine/config">配置系统</RouterLink>
<RouterLink class="guid-item" to="/note/linux/alpine/bash-apk">相关命令</RouterLink>
<RouterLink class="guid-item" to="/note/linux/alpine/app-docker">安装 Docker</RouterLink>
<RouterLink class="guid-item" to="/note/linux/alpine/app-frp">安装 Frp 服务</RouterLink>
</div>

## <Icon name="line-md:folder-multiple-filled" /> DevOps

<div class="guid-group-title"><Icon name="line-md:list" /> 组件安装</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Minio对象存储</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/devops/installapp/minio/minio-install">安装 Minio 对象存储</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/minio/minio-policy">解决 Minio 访问存储桶文件目录泄露问题</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Nacos配置中心</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/devops/installapp/nacos/nacos-install">安装 Nacos 配置中心</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/nacos/nacos-auth-config">Nacos开启鉴权配置</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> Nginx</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/devops/installapp/nginx/nginx-config">Nginx 配置</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/nginx/nginx-subfilter-html">Nginx注入自定义HTML标签</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/nginx/nginx-minio">反向代理Minio</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> PostgreSQL</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/devops/installapp/pgsql/pgsql-install">pgsql-install</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/pgsql/pgsql-config">pgsql-config</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/pgsql/pgsql-fdw">pgsql-fdw</RouterLink>
<RouterLink class="guid-item" to="/note/devops/installapp/pgsql/pgsql-backup">pgsql-backup</RouterLink>
</div>

<div class="guid-group-title"><Icon name="line-md:list" /> 系统运维</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/devops/operations/lvm-disk">LVM 磁盘工具</RouterLink>
<RouterLink class="guid-item" to="/note/devops/operations/jar-sh">运行 JAR 脚本</RouterLink>
<RouterLink class="guid-item" to="/note/devops/operations/log-rm-sh">定期删除日志脚本</RouterLink>
<RouterLink class="guid-item" to="/note/devops/operations/chrony-time">时间校时</RouterLink>
<RouterLink class="guid-item" to="/note/devops/operations/xtrabackup-sql">Xtrabackup 备份工具</RouterLink>
</div>

## <Icon name="line-md:folder-multiple-filled" /> HomeLab

<div class="guid-group-title"><Icon name="line-md:list" /> Proxmox VE</div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/homelab/pve/pve-intel-vm">Pve8开启核显直通</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-gvtg-vm">开启核显GVT-g直通给虚拟机</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-optimize">PVE优化</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-black-dsm">安装黑群晖</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-iommu-group-2vm">同一个IOMMU Group直通不同虚拟机</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-network-problem">PVE加网卡后无法进入后台及网络不通问题</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/pve/pve-qemu-guest-agent">开启QEMU Guest Agent</RouterLink>
</div>
<div class="guid-separator"></div>
<div class="guid-items">
<RouterLink class="guid-item" to="/note/homelab/baota-depoy-lskypro">宝塔面板部署兰空图床</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/frp-deploy">部署 Frp 服务</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/truenas-run-dockeralist">使用TrueNAS运行Alist容器</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/immich-record">Immich图片管理软件备忘录</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/istoreos-install-openclash">iStoreOS 安装 OpenClash</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/jumpserver-install">JumpServer开源堡垒机</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/beszel-install">Beszel 监控工具</RouterLink>
<RouterLink class="guid-item" to="/note/homelab/server-init-demo">服务器初始化配置（全）</RouterLink>
</div>

## <Icon name="line-md:folder-multiple-filled" /> 其他
*这里还没有东西哦...*
</div>
