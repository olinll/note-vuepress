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
    icon: "material-symbols:container",
    prefix: "container",
    items: [
      {
        text: "Docker",
        icon: "logos:docker-icon",
        prefix: "docker",
        items: [
          "111",
          "docker-install"
        ]
      }
    ]
  },
  {
    text: "示例",
    prefix: "demo",
    items: [
      "bar",
      "foo",
      "markdown"
    ]
  },
  {
    text: "Linux",
    icon: "logos:linux-tux",
    prefix: "linux",
    items: [
      {
        text: "Centos",
        icon: "logos:centos-icon",
        prefix: "centos",
        items: [
          "centos-all"
        ]
      }
    ]
  }
],
})

export default note
