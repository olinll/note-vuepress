import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOCS_NOTE_DIR = path.resolve(ROOT, 'docs/note')
const NOTE_CONFIG_PATH = path.resolve(ROOT, 'docs/.vuepress/collections/note.ts')

// Files to ignore (relative to docs/note)
const IGNORE_FILES = new Set([
  'guid',
  'README',
  // Add other files to ignore here
])

// Helper to find files recursively
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

// 1. Load note.ts config (Reused from generate-guid.js)
function loadNoteConfig() {
  let content = fs.readFileSync(NOTE_CONFIG_PATH, 'utf-8')
  content = content.replace(/^import .*$/gm, '')
  content = content.replace(/: ThemeCollectionItem/g, '')
  content = content.replace(/^export default .*$/gm, '')
  const mockDefineCollection = (data) => data
  const funcBody = content + '\nreturn note;'
  try {
    const fn = new Function('defineCollection', funcBody)
    return fn(mockDefineCollection)
  } catch (e) {
    console.error('Failed to parse note.ts:', e)
    process.exit(1)
  }
}

// 2. Flatten config to set of paths
function flattenSidebar(items, basePath) {
  let paths = new Set()
  
  if (!items) return paths

  items.forEach(item => {
    if (typeof item === 'string') {
      // Leaf node
      const fullPath = path.posix.join(basePath, item)
      paths.add(fullPath)
    } else {
      // Group
      if (!item.text) return

      const currentPath = item.prefix ? path.posix.join(basePath, item.prefix) : basePath
      
      // If group has a direct link, add it
      if (item.link) {
         let linkPath = item.link
         if (!linkPath.startsWith('/')) {
             linkPath = path.posix.join(basePath, linkPath)
         }
         // Remove trailing slash for comparison
         paths.add(linkPath.replace(/\/$/, ''))
      }

      if (item.items && Array.isArray(item.items)) {
        const childPaths = flattenSidebar(item.items, currentPath)
        childPaths.forEach(p => paths.add(p))
      }
    }
  })
  
  return paths
}

function checkNotes() {
  console.log('正在检查笔记目录和配置文件...')
  
  // Load Config
  const config = loadNoteConfig()
  const configuredPaths = flattenSidebar(config.sidebar, '')
  
  // Scan FS
  const allFiles = getFiles(DOCS_NOTE_DIR)
  
  const fsPaths = allFiles
    .filter(f => f.endsWith('.md'))
    // .filter(f => !f.endsWith('README.md') && !f.endsWith('guid.md'))
    .map(f => {
      // Get relative path from docs/note
      const relative = path.relative(DOCS_NOTE_DIR, f)
      // Convert backslashes to slashes
      let p = relative.replace(/\\/g, '/').replace(/\.md$/, '')
      
      // Normalize README: foo/bar/README -> foo/bar
      if (p.endsWith('/README')) {
          p = p.replace(/\/README$/, '')
      }
      // Handle root README (which becomes just "README") -> ""?
      // No, root README in docs/note/README.md usually corresponds to /note/
      // But our config paths are like "container", "linux/centos".
      // If config has "linux/centos", and FS has "linux/centos/README", we map FS to "linux/centos".
      
      return p
    })
    .filter(p => !IGNORE_FILES.has(p))
    
  console.log(`文件系统中有 ${fsPaths.length} 个 Markdown 文件。`)
  console.log(`配置文件中有 ${configuredPaths.size} 个路径条目。`)
  
  // Check for missing files (FS has it, Config doesn't)
  const missing = fsPaths.filter(p => !configuredPaths.has(p))
  
  // Check for broken links (Config has it, FS doesn't)
  const fsPathSet = new Set(fsPaths)
  const broken = Array.from(configuredPaths).filter(p => {
    // Ignore external links
    if (p.startsWith('http')) return false
    
    // Normalize config path: 
    // 1. Remove leading /note/ if present (since FS scan is relative to docs/note)
    // 2. Remove leading / if present
    let normalized = p
    if (normalized.startsWith('/note/')) {
        normalized = normalized.replace(/^\/note\//, '')
    }
    normalized = normalized.replace(/^\//, '')
    
    // Check exact match
    if (fsPathSet.has(normalized)) return false
    
    return true
  })
  
  let hasIssues = false
  
  if (missing.length > 0) {
    hasIssues = true
    console.log('\n-------------------------------------------------------------')
    console.log('⚠️  发现漏掉的文件 (存在于磁盘，但未配置在 note.ts 中):')
    console.log('-------------------------------------------------------------')
    missing.forEach(p => console.log(`❌  ${p}`))
    console.log('\n提示: 请检查 note.ts 中的 prefix 或 items 配置是否正确匹配了文件夹名称。')
  } 
  
  if (broken.length > 0) {
    hasIssues = true
    console.log('\n-------------------------------------------------------------')
    console.log('⚠️  发现无效的配置 (配置在 note.ts 中，但磁盘上不存在):')
    console.log('-------------------------------------------------------------')
    broken.forEach(p => console.log(`❌  ${p}`))
    console.log('\n提示: 请检查文件名是否被修改或删除。')
  }

  if (!hasIssues) {
    console.log('\n✅  完美！所有文件和配置都一一对应。')
  } else {
    console.log('\n-------------------------------------------------------------')
  }
}

checkNotes()
