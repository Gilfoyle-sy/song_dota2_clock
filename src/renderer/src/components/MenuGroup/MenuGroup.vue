<template>
  <div class="menu-group">
    <SvgIcon id="content" class="icon-drag" name="icon-move" />
    <SvgIcon name="icon-settings-fill" @click="showBtns = !showBtns" />

    <div v-show="showBtns" class="btns">
      <SvgIcon name="icon-play-fill" @click="onPlay" />
      <SvgIcon name="icon-suspend-fill" @click="onPause" />
      <SvgIcon name="icon-stop-fill" @click="onStop" />
      <SvgIcon name="icon-notice-fill" @click="onNotice" />
      <SvgIcon name="icon-time-task-fill" @click="showInput = !showInput" />
    </div>

    <input
      v-show="showInput"
      v-model="inputTime"
      class="input-time"
      type="text"
      @blur="onBlur"
      @keyup.enter="confirmInput"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MMSSToSeconds } from '@/utils/timeHandler.js'

const emits = defineEmits(['onPlay', 'onPause', 'onStop', 'onNotice', 'confirmInput'])

const showBtns = ref(true)

function onPlay() {
  emits('onPlay')
}
function onPause() {
  emits('onPause')
}
function onStop() {
  emits('onStop')
}
function onNotice() {
  emits('onNotice')
}

const inputTime = ref('')
const showInput = ref(false)

function confirmInput() {
  showInput.value = false
  emits('confirmInput', MMSSToSeconds(inputTime.value))
}
function onBlur() {
  showInput.value = false
  inputTime.value = ''
}
</script>

<style lang="scss" scoped>
.menu-group {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  .icon-drag {
    -webkit-app-region: drag;
  }

  .btns {
    display: flex;
    gap: 4px;
  }

  .input-time {
    width: 40px;
  }
}
</style>
