import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

const note: ThemeCollectionItem = defineCollection({
  type: 'doc',
  dir: 'note',
  title: '笔记',
  prefix: 'note',
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
        items: [
          "docker-install"
        ]
      }
    ]
  },
  {
    text: "Linux",
    icon: "line-md:folder-multiple-filled",
    prefix: "linux",
    items: [
      {
        text: "Centos",
        icon: "line-md:list",
        prefix: "centos",
        collapsed: false,
        items: [
         "installation",
         "optimize",
         "app-jdk",
         "app-maven",
         "app-nginx",
         "app-redis",
         "app-mysql",
         "app-docker",
         "app-squid",
         "app-nexus",
         "app-kafka",
         "app-mongodb",
         "app-samba",
        ]
      }
    ]
  }
],
})

export default note
