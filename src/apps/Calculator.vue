<template>
  <div class="calculator-app">
    <div class="display">
      <div class="previous">{{ previous }} {{ operator }}</div>
      <div class="current">{{ current || '0' }}</div>
    </div>
    
    <div class="keypad">
      <button @click="clear" class="span-2">AC</button>
      <button @click="changeSign">±</button>
      <button @click="percent">%</button>
      <button @click="selectOperator('÷')" class="operator">÷</button>
      
      <button @click="append('7')">7</button>
      <button @click="append('8')">8</button>
      <button @click="append('9')">9</button>
      <button @click="selectOperator('×')" class="operator">×</button>
      
      <button @click="append('4')">4</button>
      <button @click="append('5')">5</button>
      <button @click="append('6')">6</button>
      <button @click="selectOperator('-')" class="operator">-</button>
      
      <button @click="append('1')">1</button>
      <button @click="append('2')">2</button>
      <button @click="append('3')">3</button>
      <button @click="selectOperator('+')" class="operator">+</button>
      
      <button @click="append('0')" class="span-2">0</button>
      <button @click="dot">.</button>
      <button @click="equals" class="operator">=</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref('')
const previous = ref('')
const operator = ref('')
const operatorClicked = ref(false)

const clear = () => {
  current.value = ''
  previous.value = ''
  operator.value = ''
  operatorClicked.value = false
}

const append = (number: string) => {
  if (operatorClicked.value) {
    current.value = ''
    operatorClicked.value = false
  }
  current.value = current.value + number
}

const dot = () => {
  if (current.value.indexOf('.') === -1) {
    append('.')
  }
}

const changeSign = () => {
  current.value = current.value.charAt(0) === '-' ? 
    current.value.slice(1) : `-${current.value}`
}

const percent = () => {
  current.value = `${parseFloat(current.value) / 100}`
}

const selectOperator = (op: string) => {
  if (current.value === '') return
  if (previous.value !== '') {
    equals()
  }
  operator.value = op
  previous.value = current.value
  operatorClicked.value = true
}

const equals = () => {
  let result = 0
  const curr = parseFloat(current.value)
  const prev = parseFloat(previous.value)
  
  switch (operator.value) {
    case '+':
      result = prev + curr
      break
    case '-':
      result = prev - curr
      break
    case '×':
      result = prev * curr
      break
    case '÷':
      result = prev / curr
      break
    default:
      return
  }
  
  current.value = result.toString()
  operator.value = ''
  previous.value = ''
  operatorClicked.value = true
}
</script>

<style lang="scss" scoped>
.calculator-app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  padding: 20px;
  gap: 20px;

  .display {
    background: var(--surface-color);
    padding: 20px;
    border-radius: 12px;
    text-align: right;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .previous {
      color: var(--text-secondary);
      font-size: 1.5em;
      min-height: 30px;
    }

    .current {
      color: var(--text-color);
      font-size: 3em;
      font-weight: 300;
    }
  }

  .keypad {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    button {
      font-size: 1.5em;
      padding: 15px;
      border: none;
      border-radius: 12px;
      background: var(--surface-color);
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--hover-color);
      }

      &:active {
        transform: scale(0.95);
      }

      &.span-2 {
        grid-column: span 2;
      }

      &.operator {
        background: var(--primary-color);
        color: white;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
</style> 