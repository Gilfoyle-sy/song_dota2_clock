<template>
  <div class="aegis-box">
    <div class="title">
      <img @click="onStart" src="@/assets/icons/icon-aegis.webp" alt="" />
    </div>

    <div class="line">
      <progress :value="progressValue" :max="progressMax"></progress>
      <div class="count-down" @click="showInputTime = !showInputTime">{{ countDown }}</div>
    </div>

    <input
      class="input-time"
      v-show="showInputTime"
      type="text"
      v-model="inputTime"
      @keyup.enter="onEnter"
    />
  </div>
</template>

<script setup>
import { secondsToMMSS, MMSSToSeconds } from '@/utils/timeHandler.js'
import { ref, watch } from 'vue'

const props = defineProps({
  seconds: {
    type: Number,
    default: 0
  }
})

const isStart = ref(false)
const inputTime = ref('')
const showInputTime = ref(false)
const progressValue = ref(0)
const progressMax = ref(660)
const countDown = ref('0:00')

const killTime = ref(0)

// 点击图标开始
function onStart() {
  isStart.value = true
  killTime.value = props.seconds
  progressValue.value = 0
}

// 输入值开始
function onEnter() {
  isStart.value = true
  killTime.value = MMSSToSeconds(inputTime.value)
  progressValue.value = props.seconds - killTime.value
  inputTime.value = ''
  showInputTime.value = false
}

watch(
  () => props.seconds,
  (newVal) => {
    if (!isStart.value) {
      // 如果没有开始 则不处理
      return
    } else if (progressValue.value >= progressMax.value || newVal === 0) {
      // 结束了， 重置数据
      isStart.value = false
      progressValue.value = 0
      killTime.value = 0
      countDown.value = '0:00'
    } else {
      progressValue.value = newVal - killTime.value
      countDown.value = secondsToMMSS(progressMax.value - progressValue.value)
    }
  }
)
</script>

<style lang="scss" scoped>
.aegis-box {
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 0;
  position: relative;

  .title {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #080706;
    border-radius: 50%;
    border: 6px solid ragba(red, 0.5);
    img {
      width: 80%;
    }
  }

  .line {
    flex: 1;
    position: relative;
    left: -4px;
    z-index: 1;

    &:before {
      content: '';
      position: absolute;
      z-index: 10;
      left: calc(72.2%);
      top: 5px;
      width: 3px;
      height: 14px;
      background-color: #e4393c;
    }

    progress {
      width: 100%;
      height: 16px;
      background-color: transparent;
      box-shadow: 0 0 4px #000;
      border-radius: 2px;
      padding: 1px;

      &::-webkit-progress-bar {
        border-radius: 2px;
        background: rgba(#000, 0.7);
      }

      &::-webkit-progress-value {
        border-radius: 2px;
        background: #93b8c0;
        background: linear-gradient(#6e8a91, #97bbc4, #6e8a91);
      }
    }

    .count-down {
      position: absolute;
      z-index: 100;
      top: 3px;
      left: calc(50% - 16px);
      font-size: 12px;
      font-weight: 600;
      text-align: right;
      text-shadow: 0 0 2px #000;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .input-time {
    position: absolute;
    right: -60px;
    width: 50px;
  }
}
</style>
