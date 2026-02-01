import type { ThemeCollectionItem } from "vuepress-theme-plume";
import { defineCollection } from "vuepress-theme-plume";

const note: ThemeCollectionItem = defineCollection({
  type: "doc",
  dir: "note",
  title: "笔记",
  sidebar: [
    {
      // text: "容器化",
      // icon: "line-md:folder-multiple-filled",
      // prefix: "note",
      items: [
        {
          text: "主页",
          icon: "line-md:home",
          link: "/",
        },
        {
          text: "目录",
          icon: "line-md:list",
          link: "/note/guid/",
        },
      ],
    },
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
          // link: "docker/",
          items: [
            "installation", // 安装 Docker
            "prod-config", // 生产配置
            "get-cert", // 获取证书
            "docker-bash", // 操作命令
            "uninstall", // 卸载 Docker
          ],
        },
        {
          text: "Docker Compose",
          icon: "line-md:list",
          prefix: "compose",
          collapsed: true,
          // link: "compose/",
          items: [
            "install", // 安装 Compose
            "bash-compose", // 常用命令
          ],
        },
        {
          text: "Kubernetes",
          icon: "line-md:list",
          prefix: "kubernetes",
          collapsed: true,
          // link: "kubernetes/",
          items: [
            "kubesphere-install", // 安装 Kubernetes
            "kubernetes-upd-dir", // 修改数据目录
            "kubelet-upd-dir", // 修改 Kubelet 默认工作目录
          ],
        },
        {
          text: "项目推荐",
          icon: "line-md:list",
          prefix: "star",
          collapsed: true,
          // link: "star/",
          items: [
            "memos", // Memos 笔记
            "sum-panel", // Sun-Panel面板
            "uptime-kuma", // Uptime Kuma
          ],
        },
      ],
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
            "installation", // 安装 CentOS
            "optimize", // 优化 CentOS
            "app-jdk", // 安装 JDK
            "app-maven", // 安装 Maven
            "app-nginx", // 安装 Nginx
            "app-redis", // 安装 Redis
            "app-mysql", // 安装 MySQL
            "app-docker", // 安装 Docker
            "app-squid", // 安装 Squid
            "app-nexus", // 安装 Nexus
            "app-kafka", // 安装 Kafka
            "app-mongodb", // 安装 MongoDB
            "app-samba", // 安装 Samba
          ],
        },
        {
          text: "Ubuntu",
          icon: "line-md:list",
          prefix: "ubuntu",
          // link: "ubuntu/",
          collapsed: true,
          items: [
            "ubuntu-install", // 安装 Ubuntu
            "ubuntu-config", // 系统配置
            "ubuntu-mysql", // 安装 Ubuntu mysql
          ],
        },

        {
          text: "Alpine",
          icon: "line-md:list",
          prefix: "alpine",
          link: "alpine/",
          collapsed: true,
          items: [
            "install", // 安装 Alpine
            "config", // 配置 Alpine
            "bash-apk", // 常用命令
            "app-docker", // 安装 Docker
            "app-frp", // 安装 Frp 服务
          ],
        },
      ],
    },
    {
      text: "DevOps",
      icon: "line-md:folder-multiple-filled",
      prefix: "devops",
      collapsed: false,
      items: [
        {
          text: "组件安装",
          icon: "line-md:list",
          prefix: "installapp",
          // link: "installapp/",
          collapsed: true,
          items: [
            {
              text: "Minio对象存储",
              icon: "line-md:list",
              prefix: "minio",
              // link: "minio/",
              collapsed: true,
              items: [
                "minio-install", // 安装 Minio
                "minio-policy", // 配置 Minio 存储桶策略
              ],
            },
            {
              text: "Nacos配置中心",
              icon: "line-md:list",
              prefix: "nacos",
              // link: "nacos/",
              collapsed: true,
              items: [
                "nacos-install", // 安装 Nacos
                "nacos-auth-config", // Nacos 开启鉴权配置
              ],
            },
            {
              text: "Nginx",
              icon: "line-md:list",
              prefix: "nginx",
              // link: "nginx/",
              collapsed: true,
              items: [
                "nginx-config", // Nginx 配置
                "nginx-subfilter-html", // Nginx 注入自定义 HTML 标签
                "nginx-minio", // Nginx 反向代理 Minio
              ],
            },
            {
              text: "PostgreSQL",
              icon: "line-md:list",
              prefix: "postgresql",
              // link: "pgsql/",
              collapsed: true,
              items: [
                "pgsql-install", // 安装 PostgreSQL
                "pgsql-config", // 配置 PostgreSQL
                "pgsql-fdw", // PostgreSQL 外部表
                "pgsql-backup", // PostgreSQL 备份与恢复
              ],
            },
          ],
        },
        {
          text: "系统运维",
          icon: "line-md:list",
          prefix: "operations",
          // link: "operations/",
          collapsed: true,
          items: [
            "lvm-disk", // LVM 磁盘工具
            "jar-sh", // 运行 Jar 包
            "log-rm-sh", // 删除文件
            "chrony-time", // 时间校时
            "xtrabackup-sql", // Xtrabackup 备份工具
          ],
        },
      ],
    },
    {
      text: "HomeLab",
      icon: "line-md:folder-multiple-filled",
      prefix: "homelab",
      link: "homelab/",
      collapsed: true,
      items: [
        {
          text: "Proxmox VE",
          icon: "line-md:list",
          prefix: "pve",
          // link: "pve/",
          collapsed: true,
          items: [
            "pve-intel-vm", // Intel VM 优化
            "pve-gvtg-vm", // GVT-g VM 优化
            "pve-optimize", // PVE 优化
            "pve-black-dsm", // 安装黑群晖
            "pve-iommu-group-2vm", // IOMMU 优化
            "pve-network-problem", // 网络问题
            "pve-qemu-guest-agent", // QEMU Guest Agent
          ],
        },
        "baota-depoy-lskypro", //宝塔部署兰空图床
        "frp-deploy", //部署Frp服务
        "truenas-run-dockeralist", // 使用TrueNAS运行Alist容器
        "immich-record", // Immich 记录
        "istoreos-install-openclash", // 安装 OpenClash
        "jumpserver-install", // 安装 Jumpserver
        "beszel-install", // 安装 Beszel
        "server-init-demo", // 服务器初始化配置（全）
      ],
    },
    {
      text: "其他",
      icon: "line-md:folder-multiple-filled",
      prefix: "other",
      collapsed: true,
      items: "auto",
    },
  ],
});

export default note;
