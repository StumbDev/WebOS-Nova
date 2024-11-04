<template>
  <div class="card-stack">
    <div class="card-container">
      <TransitionGroup name="card">
        <Card
          v-for="card in cards"
          :key="card.id"
          :app-id="card.id"
          :title="card.title"
          @close="removeCard(card.id)"
        >
          <component :is="card.component" v-bind="card.props" />
        </Card>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Component } from 'vue'
import Card from './Card.vue'

interface CardData {
  id: string
  title: string
  component: Component
  props?: Record<string, any>
}

const cards = ref<CardData[]>([])

const removeCard = (id: string) => {
  cards.value = cards.value.filter(card => card.id !== id)
}

// Method to add new cards
const addCard = (card: CardData) => {
  cards.value.push(card)
}

// Expose addCard method to parent components
defineExpose({ addCard })
</script>

<style lang="scss" scoped>
.card-stack {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  -webkit-overflow-scrolling: touch;

  .card-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding-bottom: 80px; // Space for dock
  }
}

.card-enter-active,
.card-leave-active {
  transition: all 0.3s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Responsive adjustments
@media (max-width: $mobile) {
  .card-stack {
    padding: 10px;
    
    .card-container {
      grid-template-columns: 1fr;
      padding-bottom: 100px; // More space for dock on mobile
    }
  }
}
</style> 