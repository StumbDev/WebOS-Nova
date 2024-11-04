<template>
  <div class="file-manager">
    <ScrollContainer custom-scrollbar class="sidebar">
      <div class="locations">
        <button 
          v-for="location in locations" 
          :key="location.path"
          class="location-item"
          :class="{ active: currentPath === location.path }"
          @click="navigateTo(location.path)"
        >
          <SystemIcons :name="location.icon" :size="20" />
          {{ location.name }}
        </button>
      </div>
    </ScrollContainer>
    
    <div class="main-content">
      <div class="toolbar">
        <div class="navigation">
          <button @click="goBack" :disabled="!canGoBack">
            <SystemIcons name="arrow-back" :size="20" />
          </button>
          <button @click="goForward" :disabled="!canGoForward">
            <SystemIcons name="arrow-forward" :size="20" />
          </button>
          <button @click="goUp">
            <SystemIcons name="arrow-up" :size="20" />
          </button>
        </div>
        
        <div class="path-bar">
          <button 
            v-for="(segment, index) in pathSegments" 
            :key="index"
            @click="navigateToSegment(index)"
          >
            {{ segment }}
            <span v-if="index < pathSegments.length - 1">/</span>
          </button>
        </div>
        
        <div class="view-options">
          <button @click="viewMode = 'grid'">
            <SystemIcons name="grid" :size="20" />
          </button>
          <button @click="viewMode = 'list'">
            <SystemIcons name="list" :size="20" />
          </button>
        </div>
      </div>
      
      <ScrollContainer custom-scrollbar class="files-container" :class="viewMode">
        <div 
          v-for="item in sortedItems" 
          :key="item.path"
          class="file-item"
          @click="handleItemClick(item)"
          @contextmenu.prevent="showContextMenu($event, item)"
        >
          <SystemIcons 
            :name="getItemIcon(item)" 
            :size="viewMode === 'grid' ? 48 : 24" 
          />
          <span class="name">{{ item.name }}</span>
          <span v-if="viewMode === 'list'" class="details">
            {{ item.size }} - {{ item.modified }}
          </span>
        </div>
      </ScrollContainer>
    </div>
    
    <!-- Context Menu -->
    <div 
      v-if="contextMenu.show"
      class="context-menu"
      :style="{
        top: `${contextMenu.y}px`,
        left: `${contextMenu.x}px`
      }"
    >
      <button @click="handleContextAction('open')">Open</button>
      <button @click="handleContextAction('rename')">Rename</button>
      <button @click="handleContextAction('copy')">Copy</button>
      <button @click="handleContextAction('cut')">Cut</button>
      <button @click="handleContextAction('delete')" class="danger">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SystemIcons from '@/components/icons/SystemIcons.vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

interface FileItem {
  name: string
  path: string
  type: 'file' | 'directory'
  size: string
  modified: string
}

const viewMode = ref<'grid' | 'list'>('grid')
const currentPath = ref('/home/user')
const history = ref<string[]>([])
const historyIndex = ref(-1)
const contextMenu = ref({
  show: false,
  x: 0,
  y: 0,
  item: null as FileItem | null
})

const locations = [
  { name: 'Home', path: '/home/user', icon: 'home' },
  { name: 'Documents', path: '/home/user/documents', icon: 'folder' },
  { name: 'Downloads', path: '/home/user/downloads', icon: 'download' },
  { name: 'Pictures', path: '/home/user/pictures', icon: 'image' },
  { name: 'Music', path: '/home/user/music', icon: 'music' },
  { name: 'Videos', path: '/home/user/videos', icon: 'video' }
]

// Mock file system data
const items = ref<FileItem[]>([
  { name: 'Documents', path: '/home/user/documents', type: 'directory', size: '--', modified: '2023-10-01' },
  { name: 'Downloads', path: '/home/user/downloads', type: 'directory', size: '--', modified: '2023-10-02' },
  { name: 'Pictures', path: '/home/user/pictures', type: 'directory', size: '--', modified: '2023-10-03' },
  { name: 'report.pdf', path: '/home/user/report.pdf', type: 'file', size: '2.5 MB', modified: '2023-10-04' },
  { name: 'notes.txt', path: '/home/user/notes.txt', type: 'file', size: '12 KB', modified: '2023-10-05' }
])

const sortedItems = computed(() => {
  return [...items.value].sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name)
    }
    return a.type === 'directory' ? -1 : 1
  })
})

const pathSegments = computed(() => {
  return currentPath.value.split('/').filter(Boolean)
})

const canGoBack = computed(() => historyIndex.value > 0)
const canGoForward = computed(() => historyIndex.value < history.value.length - 1)

const navigateTo = (path: string) => {
  currentPath.value = path
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(path)
  historyIndex.value++
}

const goBack = () => {
  if (canGoBack.value) {
    historyIndex.value--
    currentPath.value = history.value[historyIndex.value]
  }
}

const goForward = () => {
  if (canGoForward.value) {
    historyIndex.value++
    currentPath.value = history.value[historyIndex.value]
  }
}

const goUp = () => {
  const segments = currentPath.value.split('/').filter(Boolean)
  segments.pop()
  navigateTo('/' + segments.join('/'))
}

const navigateToSegment = (index: number) => {
  const segments = currentPath.value.split('/').filter(Boolean)
  navigateTo('/' + segments.slice(0, index + 1).join('/'))
}

const getItemIcon = (item: FileItem) => {
  if (item.type === 'directory') return 'folder'
  
  const extension = item.name.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf': return 'pdf'
    case 'txt': return 'text'
    case 'jpg':
    case 'png':
    case 'gif': return 'image'
    case 'mp3':
    case 'wav': return 'music'
    case 'mp4':
    case 'mov': return 'video'
    default: return 'file'
  }
}

const handleItemClick = (item: FileItem) => {
  if (item.type === 'directory') {
    navigateTo(item.path)
  } else {
    // Handle file opening
    console.log('Opening file:', item.path)
  }
}

const showContextMenu = (event: MouseEvent, item: FileItem) => {
  contextMenu.value = {
    show: true,
    x: event.clientX,
    y: event.clientY,
    item
  }
  
  // Hide context menu when clicking outside
  const hideMenu = () => {
    contextMenu.value.show = false
    document.removeEventListener('click', hideMenu)
  }
  document.addEventListener('click', hideMenu)
}

const handleContextAction = (action: string) => {
  if (!contextMenu.value.item) return
  
  switch (action) {
    case 'open':
      handleItemClick(contextMenu.value.item)
      break
    case 'rename':
      // Implement rename logic
      break
    case 'copy':
      // Implement copy logic
      break
    case 'cut':
      // Implement cut logic
      break
    case 'delete':
      // Implement delete logic
      break
  }
  
  contextMenu.value.show = false
}
</script>

<style lang="scss" scoped>
.file-manager {
  height: 100%;
  display: flex;
  background: var(--background-color);
  color: var(--text-color);

  .sidebar {
    width: 200px;
    background: var(--surface-color);
    border-right: 1px solid var(--border-color);
    padding: 10px;

    .location-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px;
      border: none;
      background: none;
      color: var(--text-color);
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: var(--hover-color);
      }

      &.active {
        background: var(--primary-color);
        color: white;
      }
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: var(--surface-color);
      border-bottom: 1px solid var(--border-color);

      .navigation {
        display: flex;
        gap: 5px;

        button {
          padding: 5px;
          border: none;
          background: none;
          color: var(--text-color);
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: var(--hover-color);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .path-bar {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        background: var(--hover-color);
        border-radius: 6px;

        button {
          padding: 2px 4px;
          border: none;
          background: none;
          color: var(--text-color);
          cursor: pointer;
          border-radius: 4px;

          &:hover {
            background: var(--active-color);
          }
        }
      }

      .view-options {
        display: flex;
        gap: 5px;

        button {
          padding: 5px;
          border: none;
          background: none;
          color: var(--text-color);
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: var(--hover-color);
          }
        }
      }
    }

    .files-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;

      &.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 20px;

        .file-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background: var(--hover-color);
          }

          .name {
            margin-top: 5px;
            font-size: 0.9em;
            word-break: break-word;
          }
        }
      }

      &.list {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .file-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;

          &:hover {
            background: var(--hover-color);
          }

          .name {
            flex: 1;
          }

          .details {
            color: var(--text-secondary);
            font-size: 0.9em;
          }
        }
      }
    }
  }

  .context-menu {
    position: fixed;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    button {
      display: block;
      width: 100%;
      padding: 8px 16px;
      border: none;
      background: none;
      color: var(--text-color);
      text-align: left;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: var(--hover-color);
      }

      &.danger {
        color: #f44336;
      }
    }
  }
}
</style> 