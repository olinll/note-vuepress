import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Olinl Note",
  description: "笔记仓库",

  theme,
  

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
