/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { execSync } from 'node:child_process'
import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar'
// import collections from './collections'
import collections from './collections/index'

const getGitInfo = () => {
  try {
    const hash = execSync('git rev-parse --short=7 HEAD').toString().trim()
    const date = execSync('git show -s --format=%cd --date=format:"%Y-%m-%d %H:%M:%S" HEAD').toString().trim()
    return { hash, date }
  } catch {
    const now = new Date()
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    return { hash: '0000000', date }
  }
}

const { hash, date } = getGitInfo()
const repo = 'https://github.com/olinll/note-vuepress'

/**
 * @see https://theme-plume.vuejs.press/config/theme/
 */
export default defineThemeConfig({
  logo: 'https://q2.qlogo.cn/headimg_dl?dst_uin=9892214&spec=0',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'github', link: 'https://github.com/olinll' },
    { icon: 'qq', link: 'https://2r.hk/q' },
  ],
  navbarSocialInclude: ['github', 'qq'], // 允许显示在导航栏的 social 社交链接
  aside: true, // 页内侧边栏， 默认显示在右侧
  outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: false,

  prevPage: true,   // 是否启用上一页链接
  nextPage: true,   // 是否启用下一页链接
  createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  footer: {
    message: '',
    copyright: `<div class="custom-copyright" style="width: 100%; text-align: right; font-size: 12px;">本站代码 <a href="${repo}" target="_blank">已开源</a> (<a href="${repo}/commit/${hash}" target="_blank">${hash} @ ${date})</a></div>`,
  },

  /**
   * @see https://theme-plume.vuejs.press/config/theme/#profile
   */
  profile: {
    avatar: 'https://theme-plume.vuejs.press/plume.png',
    name: 'My Vuepress Site',
    description: '',
    // circle: true,
    // location: '',
    // organization: '',
  },

  navbar,
  collections,

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/theme/#transition */
  transition: {
    page: true,        // 启用 页面间跳转过渡动画
    postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'circle-clip',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  },

})
