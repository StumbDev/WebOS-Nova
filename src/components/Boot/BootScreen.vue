<template>
  <div class="boot-screen" :class="{ 'fade-out': bootComplete }">
    <div class="logo-animation">
      <div class="galaxy" :class="{ 'animate': startAnimation }">
        <div class="stars"></div>
        <div class="text">Galaxy</div>
      </div>
      <div class="webos" :class="{ 'animate': showWebOS }">WebOS</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const startAnimation = ref(false)
const showWebOS = ref(false)
const bootComplete = ref(false)

const emit = defineEmits<{
  (e: 'complete'): void
}>()

onMounted(() => {
  // Start animation sequence
  setTimeout(() => {
    startAnimation.value = true
  }, 500)

  setTimeout(() => {
    showWebOS.value = true
  }, 2000)

  setTimeout(() => {
    bootComplete.value = true
  }, 3500)

  setTimeout(() => {
    emit('complete')
  }, 4000)
})
</script>

<style lang="scss" scoped>
.boot-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: opacity 0.5s ease;

  &.fade-out {
    opacity: 0;
  }
}

.logo-animation {
  text-align: center;
  color: white;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  
  .galaxy {
    position: relative;
    font-size: 48px;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    
    &.animate {
      animation: fadeInUp 1s ease forwards;
    }

    .stars {
      position: absolute;
      top: -100%;
      left: -100%;
      right: -100%;
      bottom: -100%;
      background-image: 
        radial-gradient(2px 2px at 20px 30px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
      animation: rotate 20s linear infinite;
    }

    .text {
      position: relative;
      background: linear-gradient(45deg, #1a73e8, #8ab4f8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .webos {
    font-size: 48px;
    font-weight: 600;
    opacity: 0;
    transform: translateY(20px);
    color: #1a73e8;
    
    &.animate {
      animation: fadeInUp 1s ease forwards;
    }
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 