import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const NOTE_CONFIG_PATH = path.resolve(ROOT, 'docs/.vuepress/collections/note.ts')
const OUTPUT_FILE = path.resolve(ROOT, 'docs/note/guid.md')

function loadNoteConfig() {
  let content = fs.readFileSync(NOTE_CONFIG_PATH, 'utf-8')
  
  // 1. Remove imports
  content = content.replace(/^import .*$/gm, '')
  
  // 2. Remove type annotations
  content = content.replace(/: ThemeCollectionItem/g, '')
  
  // 3. Remove export
  content = content.replace(/^export default .*$/gm, '')
  
  // 4. Mock defineCollection and extract data
  const mockDefineCollection = (data) => data
  
  // Create a function that returns the 'note' variable
  const funcBody = content + '\nreturn note;'
  
  try {
    const fn = new Function('defineCollection', funcBody)
    return fn(mockDefineCollection)
  } catch (e) {
    console.error('Failed to parse note.ts:', e)
    process.exit(1)
  }
}

function resolveLink(basePath, prefix, itemLink) {
  let currentPath = basePath
  if (prefix) {
    currentPath = path.posix.join(currentPath, prefix)
  }
  
  if (itemLink) {
    if (itemLink.startsWith('/')) return itemLink
    return path.posix.join(currentPath, itemLink)
  }
  
  return currentPath
}

function getTitleFromUrl(url) {
  try {
    const relativePath = url.replace(/^\//, '')
    const filePath = path.join(ROOT, 'docs', relativePath + '.md')
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const fmMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/)
      if (fmMatch) {
        const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m)
        if (titleMatch) {
          return titleMatch[1].trim().replace(/^['"](.*)['"]$/, '$1')
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return null
}

function renderSidebarItem(item, basePath, level = 0) {
  let lines = []
  
  // Handle string item (Leaf node)
  if (typeof item === 'string') {
    const link = path.posix.join(basePath, item)
    const title = getTitleFromUrl(link) || item
    // Use RouterLink for SPA navigation
    return [`<RouterLink class="guid-item" to="${link}">${title}</RouterLink>`]
  }
  
  // Handle group/object item
  
  // Skip if text is empty
  if (!item.text || !item.text.trim()) return []

  const currentPath = resolveLink(basePath, item.prefix)
  
  // Render Header
  let text = item.text || ''
  const icon = item.icon ? `<Icon name="${item.icon}" /> ` : ''
  
  if (level === 0) {
    let headerContent = `${icon}${text}`
    if (item.link) {
      const linkPath = item.link.startsWith('/') 
        ? item.link 
        : path.posix.join(basePath, item.link)
      headerContent = `<RouterLink to="${linkPath}" style="color: inherit; text-decoration: none;">${headerContent}</RouterLink>`
    }
    lines.push(`\n## ${headerContent}`)
  } else {
    // Use bold text or H3/H4 for sub-headers
    // Add margin-top for separation
    
    // If group has a link, make the title clickable
    let content = `${icon}${text}`
    if (item.link) {
      // Construct full link path
      // item.link is relative to basePath (parent), not currentPath (which includes prefix for children)
      const linkPath = item.link.startsWith('/') 
        ? item.link 
        : path.posix.join(basePath, item.link)
      content = `<RouterLink to="${linkPath}" style="color: inherit; text-decoration: none;">${content}</RouterLink>`
    }
    
    lines.push(`\n<div class="guid-group-title">${content}</div>`)
  }
  
  if (item.items) {
    if (item.items === 'auto') {
      lines.push(`*这里还没有东西哦...*`)
    } else if (Array.isArray(item.items)) {
      // Check if children are leaf nodes (strings)
      const isLeafGroup = item.items.every(i => typeof i === 'string')
      
      if (isLeafGroup) {
        // Collect all leaf nodes and wrap in container
        const leaves = item.items.map(subItem => {
          // Manually handle string items here to avoid recursion overhead/wrapping issues
          if (typeof subItem === 'string') {
            const link = path.posix.join(currentPath, subItem)
            const title = getTitleFromUrl(link) || subItem
            return `<RouterLink class="guid-item" to="${link}">${title}</RouterLink>`
          }
          return ''
        })
        lines.push(`<div class="guid-items">\n${leaves.join('\n')}\n</div>`)
      } else {
        // Mixed or nested groups
        let currentLeaves = []
        let hasRenderedGroup = false
        
        item.items.forEach(subItem => {
          if (typeof subItem === 'string') {
            currentLeaves.push(subItem)
          } else {
            // It is a group (object)
            
            // Flush preceding leaves
            if (currentLeaves.length > 0) {
                 const leafLines = currentLeaves.map(leaf => {
                    const link = path.posix.join(currentPath, leaf)
                    const title = getTitleFromUrl(link) || leaf
                    return `<RouterLink class="guid-item" to="${link}">${title}</RouterLink>`
                 })
                 lines.push(`<div class="guid-items">\n${leafLines.join('\n')}\n</div>`)
                 currentLeaves = []
            }
            
            // Render the group
            lines.push(...renderSidebarItem(subItem, currentPath, level + 1))
            hasRenderedGroup = true
          }
        })
        
        // Flush trailing leaves
        if (currentLeaves.length > 0) {
             if (hasRenderedGroup) {
                 lines.push('<div class="guid-separator"></div>')
             }
             const leafLines = currentLeaves.map(leaf => {
                const link = path.posix.join(currentPath, leaf)
                const title = getTitleFromUrl(link) || leaf
                return `<RouterLink class="guid-item" to="${link}">${title}</RouterLink>`
             })
             lines.push(`<div class="guid-items">\n${leafLines.join('\n')}\n</div>`)
        }
      }
    }
  }
  
  return lines
}

function generateGuid() {
  console.log('Reading config...')
  const config = loadNoteConfig()
  
  const prefix = config.prefix || config.dir
  const rootPrefix = prefix ? `/${prefix}/` : '/'
  
  console.log('Generating markdown...')
  let mdContent = []
  
  let frontmatter = `---
title: 目录
createTime: 2026/02/01 22:34:56
permalink: /note/guid/
aside: false
editLink: false
changelog: false
contributors: false
externalLinkIcon: false
pageClass: note-page
lastUpdated: false
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
`

  if (config.sidebar && Array.isArray(config.sidebar)) {
    config.sidebar.forEach(item => {
      if (item.link === '/note/guid/') return
      mdContent.push(...renderSidebarItem(item, rootPrefix, 0))
    })
  }
  
  mdContent.push('</div>')
  
  const finalContent = frontmatter + mdContent.join('\n') + '\n'
  
  fs.writeFileSync(OUTPUT_FILE, finalContent)
  console.log(`Generated ${OUTPUT_FILE}`)
}

generateGuid()
