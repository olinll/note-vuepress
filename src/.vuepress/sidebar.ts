import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  //通过文件结构自动生成侧边栏
   "/": "structure",
  // "/": [
  //   "",
  //   "portfolio",
  //   {
  //     text: "案例",
  //     icon: "laptop-code",
  //     prefix: "demo/",
  //     link: "demo/",
  //     children: "structure",
  //   },
  //   {
  //     text: "文档",
  //     icon: "book",
  //     prefix: "guide/",
  //     children: "structure",
  //   },
  //   {
  //     text: "幻灯片",
  //     icon: "person-chalkboard",
  //     link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
  //   },
  // ],
});
