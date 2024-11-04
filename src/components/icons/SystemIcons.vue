<template>
  <IconBase v-bind="$attrs">
    <template v-if="name === 'wifi'">
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
    </template>
    
    <template v-else-if="name === 'bluetooth'">
      <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
    </template>
    
    <template v-else-if="name === 'brightness'">
      <path d="M20 8.69V4h-4.69L12 0.69L8.69 4H4v4.69L0.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12L20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6s6 2.69 6 6S15.31 18 12 18z"/>
    </template>
    
    <template v-else-if="name === 'volume'">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </template>
    
    <template v-else-if="name === 'launcher'">
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
    </template>
    
    <template v-else-if="name === 'settings'">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/>
    </template>
    
    <template v-else-if="name === 'charging'">
      <path d="M13 4h-2V2h-2v2H7v9H5v2h2v2h2v2h2v-2h2v-2h2v-2h-2z"/>
    </template>
    
    <template v-else-if="name === 'wifi-off'">
      <path d="M21 11l2-2c-3.73-3.73-8.87-5.15-13.7-4.31l2.58 2.58c3.3-.02 6.61 1.22 9.12 3.73zm-2 2c-1.08-1.08-2.36-1.85-3.72-2.33l3.02 3.02.7-.69zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zM3.41 1.64L2 3.05 5.05 6.1C3.59 6.83 2.22 7.79 1 9l2 2c1.23-1.23 2.65-2.16 4.17-2.78l2.24 2.24C7.79 10.89 6.27 11.74 5 13l2 2c1.35-1.35 3.11-2.04 4.89-2.06l7.08 7.08 1.41-1.41L3.41 1.64z"/>
    </template>
    
    <template v-else-if="name === 'theme'">
      <path d="M20 8.69V4h-4.69L12 0.69L8.69 4H4v4.69L0.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69L23.31 12L20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6s6 2.69 6 6S15.31 18 12 18zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
    </template>
    
    <template v-else-if="name === 'notes'">
      <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/>
    </template>
    
    <template v-else-if="name === 'add'">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </template>
    
    <template v-else-if="name === 'calculator'">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-5-5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </template>
    
    <template v-else-if="name === 'terminal'">
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.58-2.59L7.5 9l4 4-4 4z"/>
    </template>
    
    <template v-else-if="name === 'folder'">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </template>
  </IconBase>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import IconBase from './IconBase.vue'

defineProps<{
  name: 'wifi' | 'bluetooth' | 'brightness' | 'volume' | 'launcher' | 'settings' | 'theme' | 'charging' | 'wifi-off' | 'notes' | 'add' | 'calculator' | 'terminal' | 'folder'
}>()
</script> 