<script setup>
import { ref } from 'vue'
import RuneBox from '@/components/RuneBox/RuneBox.vue'
import AegisBox from '@/components/AegisBox/AegisBox.vue'
import MenuGroup from './components/MenuGroup/MenuGroup.vue'

const timer = ref(null)
const seconds = ref(0)

const chartsInfo = ref([
  {
    iconName: 'icon-rune-regeneration.webp',
    duration: 120
  },
  {
    iconName: 'icon-rune-bounty.webp',
    duration: 180
  },
  {
    iconName: 'icon-rune-knowledge.webp',
    duration: 420
  }
])

function onPlay() {
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    seconds.value++
  }, 1000)
}

function onPause() {
  clearInterval(timer.value)
}

function onStop() {
  clearInterval(timer.value)
  seconds.value = 0
}

function onNotice() {
  console.log('onNotice')
}

function confirmInput(val) {
  seconds.value = val
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    seconds.value++
  }, 1000)
}
</script>

<template>
  <div class="main-container">
    <MenuGroup
      @on-play="onPlay"
      @on-pause="onPause"
      @on-stop="onStop"
      @on-notice="onNotice"
      @confirm-input="confirmInput"
    />

    <RuneBox
      v-for="item in chartsInfo"
      :key="item.iconName"
      :icon-name="item.iconName"
      :duration="item.duration"
      :seconds="seconds"
    />

    <AegisBox :seconds="seconds" />
  </div>
</template>

<style scoped lang="scss"></style>
