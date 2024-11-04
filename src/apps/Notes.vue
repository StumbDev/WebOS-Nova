<template>
  <div class="notes-app">
    <div class="notes-sidebar">
      <div class="notes-header">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search notes..."
          class="search-input"
        />
        <button @click="createNote" class="new-note-btn">
          <SystemIcons name="add" :size="20" />
        </button>
      </div>
      <ScrollContainer custom-scrollbar class="notes-list">
        <div 
          v-for="note in filteredNotes" 
          :key="note.id"
          class="note-item"
          :class="{ active: note.id === currentNote?.id }"
          @click="selectNote(note)"
        >
          <h3>{{ note.title || 'Untitled' }}</h3>
          <p>{{ note.content.substring(0, 50) }}...</p>
          <span class="note-date">{{ formatDate(note.updatedAt) }}</span>
        </div>
      </ScrollContainer>
    </div>
    <ScrollContainer custom-scrollbar class="notes-editor">
      <input 
        v-if="currentNote"
        v-model="currentNote.title"
        placeholder="Note title"
        class="note-title"
      />
      <textarea
        v-if="currentNote"
        v-model="currentNote.content"
        placeholder="Start typing..."
        class="note-content"
        @input="saveNote"
      ></textarea>
      <div v-else class="empty-state">
        <SystemIcons name="notes" :size="48" />
        <p>Select a note or create a new one</p>
      </div>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SystemIcons from '@/components/icons/SystemIcons.vue'
import ScrollContainer from '@/components/common/ScrollContainer.vue'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'))
const currentNote = ref<Note | null>(null)
const searchQuery = ref('')

const filteredNotes = computed(() => {
  return notes.value
    .filter(note => 
      note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
})

const createNote = () => {
  const newNote: Note = {
    id: Date.now().toString(),
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  notes.value.unshift(newNote)
  currentNote.value = newNote
  saveNotes()
}

const selectNote = (note: Note) => {
  currentNote.value = note
}

const saveNote = () => {
  if (currentNote.value) {
    currentNote.value.updatedAt = new Date()
    saveNotes()
  }
}

const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style lang="scss" scoped>
.notes-app {
  display: flex;
  height: 100%;
  background: var(--background-color);
  color: var(--text-color);

  .notes-sidebar {
    width: 300px;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;

    .notes-header {
      padding: 15px;
      display: flex;
      gap: 10px;
      border-bottom: 1px solid var(--border-color);

      .search-input {
        flex: 1;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--surface-color);
        color: var(--text-color);
      }

      .new-note-btn {
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

    .notes-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;

      .note-item {
        padding: 15px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 8px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);

        &:hover {
          background: var(--hover-color);
        }

        &.active {
          border-color: var(--primary-color);
        }

        h3 {
          margin: 0 0 5px 0;
          font-size: 1em;
        }

        p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }

        .note-date {
          font-size: 0.8em;
          color: var(--text-secondary);
        }
      }
    }
  }

  .notes-editor {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .note-title {
      font-size: 1.5em;
      padding: 10px;
      border: none;
      background: none;
      color: var(--text-color);
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }

    .note-content {
      flex: 1;
      padding: 10px;
      border: none;
      background: none;
      color: var(--text-color);
      resize: none;
      font-family: inherit;
      line-height: 1.6;

      &:focus {
        outline: none;
      }
    }

    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      gap: 10px;
    }
  }
}
</style> 