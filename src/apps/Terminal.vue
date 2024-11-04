<template>
  <div class="terminal-app" @click="focusInput">
    <ScrollContainer custom-scrollbar class="terminal-window" ref="terminalWindow">
      <div v-for="(line, index) in outputLines" :key="index" class="output-line">
        <template v-if="line.type === 'command'">
          <span class="prompt">{{ prompt }}</span>
          <span class="command">{{ line.content }}</span>
        </template>
        <template v-else>
          <span :class="line.type">{{ line.content }}</span>
        </template>
      </div>
      
      <div class="input-line">
        <span class="prompt">{{ prompt }}</span>
        <input
          ref="commandInput"
          v-model="currentCommand"
          @keyup.enter="executeCommand"
          @keyup.up="navigateHistory(-1)"
          @keyup.down="navigateHistory(1)"
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

interface OutputLine {
  type: 'command' | 'output' | 'error'
  content: string
}

const terminalWindow = ref<HTMLElement>()
const commandInput = ref<HTMLInputElement>()
const currentCommand = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const outputLines = ref<OutputLine[]>([
  { type: 'output', content: 'Galaxy WebOS Terminal v1.0.0' },
  { type: 'output', content: 'Type "help" for a list of available commands.' }
])

const prompt = '$ '

const commands = {
  help: () => {
    return [
      'Available commands:',
      'clear    - Clear the terminal',
      'echo     - Display a message',
      'ls       - List directory contents',
      'pwd      - Print working directory',
      'date     - Display current date and time',
      'whoami   - Display current user',
      'help     - Show this help message'
    ].join('\n')
  },
  clear: () => {
    outputLines.value = []
    return ''
  },
  echo: (args: string[]) => args.join(' '),
  ls: () => {
    return [
      'Documents/',
      'Downloads/',
      'Pictures/',
      'Music/',
      'Videos/',
      'apps/',
      'system/'
    ].join('\n')
  },
  pwd: () => '/home/user',
  date: () => new Date().toString(),
  whoami: () => 'user'
}

const executeCommand = async () => {
  const command = currentCommand.value.trim()
  if (!command) return

  // Add command to history
  outputLines.value.push({ type: 'command', content: command })
  commandHistory.value.push(command)
  historyIndex.value = commandHistory.value.length

  // Parse command and arguments
  const [cmd, ...args] = command.split(' ')

  // Execute command
  try {
    if (cmd in commands) {
      const output = (commands as any)[cmd](args)
      if (output) {
        outputLines.value.push({ type: 'output', content: output })
      }
    } else {
      outputLines.value.push({ 
        type: 'error', 
        content: `Command not found: ${cmd}` 
      })
    }
  } catch (error) {
    outputLines.value.push({ 
      type: 'error', 
      content: `Error executing command: ${error}` 
    })
  }

  // Clear input and scroll to bottom
  currentCommand.value = ''
  await nextTick()
  scrollToBottom()
}

const navigateHistory = (direction: number) => {
  const newIndex = historyIndex.value + direction
  if (newIndex >= -1 && newIndex <= commandHistory.value.length) {
    historyIndex.value = newIndex
    currentCommand.value = commandHistory.value[historyIndex.value] || ''
  }
}

const scrollToBottom = () => {
  if (terminalWindow.value) {
    terminalWindow.value.scrollTop = terminalWindow.value.scrollHeight
  }
}

const focusInput = () => {
  commandInput.value?.focus()
}

onMounted(() => {
  focusInput()
})
</script>

<style lang="scss" scoped>
.terminal-app {
  height: 100%;
  background: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  font-family: 'Fira Code', 'Consolas', monospace;
  
  .terminal-window {
    height: 100%;
    overflow-y: auto;
    font-size: 14px;
    line-height: 1.6;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #2e2e2e;
    }

    &::-webkit-scrollbar-thumb {
      background: #666;
      border-radius: 4px;
    }
  }

  .output-line {
    white-space: pre-wrap;
    word-break: break-all;
    margin-bottom: 4px;
  }

  .prompt {
    color: #4caf50;
    margin-right: 8px;
  }

  .command {
    color: #ffffff;
  }

  .output {
    color: #bdbdbd;
  }

  .error {
    color: #f44336;
  }

  .input-line {
    display: flex;
    align-items: center;
    
    input {
      flex: 1;
      background: none;
      border: none;
      color: #ffffff;
      font-family: inherit;
      font-size: inherit;
      padding: 0;
      margin: 0;
      outline: none;
    }
  }
}
</style> 