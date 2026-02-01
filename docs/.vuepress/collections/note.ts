import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

const note: ThemeCollectionItem = defineCollection({
  type: 'doc',
  dir: 'note',
  title: '笔记',
  sidebar: [
  {
    text: "容器化",
    icon: "line-md:folder-multiple-filled",
    prefix: "container",
    items: [
      {
        text: "Docker",
        icon: "line-md:list",
        prefix: "docker",
        collapsed: true,
        link: "docker/",
        items: [
          "installation",// 安装 Docker
          "prod-config",// 生产配置
          "get-cert",// 获取证书
          "docker-bash",// 操作命令
          "uninstall",// 卸载 Docker
        ]
      },
      {
        text: "Docker Compose",
        icon: "line-md:list",
        prefix: "compose",
        collapsed: true,
        link: "compose/",
        items: [
          "install",// 安装 Compose
          "bash-compose",// 常用命令
        ]
      },
       {
        text: "Kubernetes",
        icon: "line-md:list",
        prefix: "kubernetes",
        collapsed: true,
        link: "kubernetes/",
        items: [
          "kubesphere-install",// 安装 Kubernetes
          "kubernetes-upd-dir",// 修改数据目录
          "kubelet-upd-dir",// 修改 Kubelet 默认工作目录
        ]
      },
      {
        text: "项目推荐",
        icon: "line-md:list",
        prefix: "star",
        collapsed: true,
        link: "star/",
        items: [
          "memos",// Memos 笔记
          "sum-panel",// Sun-Panel面板
        ]
      }
    ]
  },
  {
    text: "Linux 系统",
    icon: "line-md:folder-multiple-filled",
    prefix: "linux",
    items: [
      {
        text: "Centos",
        icon: "line-md:list",
        prefix: "centos",
        link: "centos/",
        collapsed: true,
        items: [
         "installation",// 安装 CentOS
         "optimize",// 优化 CentOS
         "app-jdk",// 安装 JDK
         "app-maven",// 安装 Maven
         "app-nginx",// 安装 Nginx
         "app-redis",// 安装 Redis
         "app-mysql",// 安装 MySQL
         "app-docker",// 安装 Docker
         "app-squid",// 安装 Squid
         "app-nexus",// 安装 Nexus
         "app-kafka",// 安装 Kafka
         "app-mongodb",// 安装 MongoDB
         "app-samba",// 安装 Samba
        ]
      },
      {
        text: "Alpine",
        icon: "line-md:list",
        prefix: "alpine",
        link: "alpine/",
        collapsed: true,
        items: [
         "install",// 安装 Alpine
         "config",// 配置 Alpine
         "bash-apk",// 常用命令
         "app-docker",// 安装 Docker
         "app-frp",// 安装 Frp 服务
        ]
      },
      {
        text: "系统运维",
        icon: "line-md:list",
        prefix: "opsdev",
        link: "opsdev/",
        collapsed: true,
        items: [
         "lvm-disk",// LVM 磁盘工具
          "jar-sh",// 运行 Jar 包
          "log-rm-sh",// 删除文件
         "chrony-time",// 时间校时
         "xtrabackup-sql",// Xtrabackup 备份工具
        ]
      }
    ]
  },
   {
    text: "HomeLab",
    icon: "line-md:folder-multiple-filled",
    prefix: "homelab",
    link: "homelab/",
    collapsed: true,
    items: 'auto'
   },
   {
    text: "其他",
    icon: "line-md:folder-multiple-filled",
    prefix: "other",
    collapsed: true,
    items: 'auto'
   }
],
})

export default note
