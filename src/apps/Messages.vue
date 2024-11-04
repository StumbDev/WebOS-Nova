<template>
  <div class="messages-app">
    <div class="chats-sidebar">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search messages..."
        />
        <button class="new-chat" @click="startNewChat">
          <SystemIcons name="add" :size="20" />
        </button>
      </div>
      
      <ScrollContainer custom-scrollbar class="chats-list">
        <div 
          v-for="chat in filteredChats" 
          :key="chat.id"
          class="chat-item"
          :class="{ active: currentChat?.id === chat.id }"
          @click="selectChat(chat)"
        >
          <div class="avatar" :style="{ backgroundColor: chat.color }">
            {{ chat.name.charAt(0) }}
          </div>
          <div class="chat-info">
            <div class="chat-header">
              <span class="name">{{ chat.name }}</span>
              <span class="time">{{ formatTime(chat.lastMessage?.timestamp) }}</span>
            </div>
            <div class="last-message">
              {{ chat.lastMessage?.content || 'No messages yet' }}
            </div>
          </div>
          <div 
            v-if="chat.unreadCount" 
            class="unread-badge"
          >
            {{ chat.unreadCount }}
          </div>
        </div>
      </ScrollContainer>
    </div>
    
    <div class="chat-area">
      <template v-if="currentChat">
        <div class="chat-header">
          <div class="chat-info">
            <div class="avatar" :style="{ backgroundColor: currentChat.color }">
              {{ currentChat.name.charAt(0) }}
            </div>
            <div class="user-info">
              <span class="name">{{ currentChat.name }}</span>
              <span class="status">{{ currentChat.status }}</span>
            </div>
          </div>
          <div class="chat-actions">
            <button>
              <SystemIcons name="call" :size="20" />
            </button>
            <button>
              <SystemIcons name="video" :size="20" />
            </button>
            <button>
              <SystemIcons name="more" :size="20" />
            </button>
          </div>
        </div>
        
        <ScrollContainer 
          ref="messagesContainer"
          custom-scrollbar 
          class="messages-container"
        >
          <div 
            v-for="message in currentChat.messages" 
            :key="message.id"
            class="message"
            :class="{ 
              'sent': message.sent,
              'received': !message.sent
            }"
          >
            <div class="message-content">
              {{ message.content }}
              <span class="message-time">
                {{ formatTime(message.timestamp) }}
              </span>
            </div>
          </div>
        </ScrollContainer>
        
        <div class="message-input">
          <button class="attach">
            <SystemIcons name="attach" :size="20" />
          </button>
          <input 
            type="text" 
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type a message..."
          />
          <button 
            class="send"
            :class="{ active: newMessage.trim() }"
            @click="sendMessage"
          >
            <SystemIcons name="send" :size="20" />
          </button>
        </div>
      </template>
      
      <div v-else class="empty-state">
        <SystemIcons name="chat" :size="48" />
        <h2>Select a chat to start messaging</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import SystemIcons from '@/components/icons/SystemIcons.vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

interface Message {
  id: string
  content: string
  timestamp: Date
  sent: boolean
}

interface Chat {
  id: string
  name: string
  color: string
  status: string
  lastMessage?: Message
  messages: Message[]
  unreadCount: number
}

const searchQuery = ref('')
const newMessage = ref('')
const currentChat = ref<Chat | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

// Mock data
const chats = ref<Chat[]>([
  {
    id: '1',
    name: 'John Doe',
    color: '#1a73e8',
    status: 'Online',
    messages: [
      {
        id: '1',
        content: 'Hey, how are you?',
        timestamp: new Date(Date.now() - 3600000),
        sent: false
      },
      {
        id: '2',
        content: 'I\'m good, thanks! How about you?',
        timestamp: new Date(Date.now() - 3500000),
        sent: true
      }
    ],
    unreadCount: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    color: '#ea4335',
    status: 'Last seen 2h ago',
    messages: [
      {
        id: '1',
        content: 'Did you see the new update?',
        timestamp: new Date(Date.now() - 7200000),
        sent: false
      }
    ],
    unreadCount: 1
  }
])

// Update last message for each chat
chats.value.forEach(chat => {
  chat.lastMessage = chat.messages[chat.messages.length - 1]
})

const filteredChats = computed(() => {
  return chats.value.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
})

const selectChat = (chat: Chat) => {
  currentChat.value = chat
  chat.unreadCount = 0
  scrollToBottom()
}

const sendMessage = () => {
  if (!currentChat.value || !newMessage.value.trim()) return
  
  const message: Message = {
    id: Date.now().toString(),
    content: newMessage.value,
    timestamp: new Date(),
    sent: true
  }
  
  currentChat.value.messages.push(message)
  currentChat.value.lastMessage = message
  newMessage.value = ''
  
  scrollToBottom()
  
  // Simulate reply
  setTimeout(() => {
    const reply: Message = {
      id: Date.now().toString(),
      content: 'Thanks for your message!',
      timestamp: new Date(),
      sent: false
    }
    
    if (currentChat.value) {
      currentChat.value.messages.push(reply)
      currentChat.value.lastMessage = reply
      scrollToBottom()
    }
  }, 1000)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (date?: Date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

const startNewChat = () => {
  // Implement new chat functionality
  console.log('Start new chat')
}
</script>

<style lang="scss" scoped>
.messages-app {
  height: 100%;
  display: flex;
  background: var(--background-color);
  color: var(--text-color);

  .chats-sidebar {
    width: 300px;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;

    .search-bar {
      padding: 15px;
      display: flex;
      gap: 10px;
      border-bottom: 1px solid var(--border-color);

      input {
        flex: 1;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--surface-color);
        color: var(--text-color);
      }

      .new-chat {
        padding: 8px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: white;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .chats-list {
      flex: 1;
      overflow-y: auto;

      .chat-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 15px;
        cursor: pointer;
        position: relative;

        &:hover {
          background: var(--hover-color);
        }

        &.active {
          background: var(--active-color);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
        }

        .chat-info {
          flex: 1;
          min-width: 0;

          .chat-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;

            .name {
              font-weight: 500;
            }

            .time {
              font-size: 0.8em;
              color: var(--text-secondary);
            }
          }

          .last-message {
            font-size: 0.9em;
            color: var(--text-secondary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .unread-badge {
          background: var(--primary-color);
          color: white;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8em;
          padding: 0 6px;
        }
      }
    }
  }

  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;

    .chat-header {
      padding: 15px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .chat-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
        }

        .user-info {
          display: flex;
          flex-direction: column;

          .name {
            font-weight: 500;
          }

          .status {
            font-size: 0.8em;
            color: var(--text-secondary);
          }
        }
      }

      .chat-actions {
        display: flex;
        gap: 8px;

        button {
          padding: 8px;
          border-radius: 8px;
          border: none;
          background: none;
          color: var(--text-color);
          cursor: pointer;

          &:hover {
            background: var(--hover-color);
          }
        }
      }
    }

    .messages-container {
      flex: 1;
      padding: 20px;
      overflow-y: auto;

      .message {
        display: flex;
        margin-bottom: 12px;

        &.sent {
          justify-content: flex-end;

          .message-content {
            background: var(--primary-color);
            color: white;
            border-radius: 16px 16px 4px 16px;
          }
        }

        &.received .message-content {
          background: var(--surface-color);
          border-radius: 16px 16px 16px 4px;
        }

        .message-content {
          padding: 10px 15px;
          max-width: 70%;
          position: relative;

          .message-time {
            font-size: 0.7em;
            opacity: 0.7;
            margin-left: 8px;
            white-space: nowrap;
          }
        }
      }
    }

    .message-input {
      padding: 15px;
      border-top: 1px solid var(--border-color);
      display: flex;
      gap: 10px;
      align-items: center;

      button {
        padding: 8px;
        border-radius: 8px;
        border: none;
        background: none;
        color: var(--text-secondary);
        cursor: pointer;

        &:hover {
          background: var(--hover-color);
        }

        &.send.active {
          color: var(--primary-color);
        }
      }

      input {
        flex: 1;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid var(--border-color);
        background: var(--surface-color);
        color: var(--text-color);

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
    }

    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      gap: 16px;

      h2 {
        font-weight: normal;
      }
    }
  }
}
</style> 