<template>
  <div class="rune-box">
    <div class="title">
      <img :src="iconPath(iconName)" alt="" />
    </div>

    <div class="line">
      <progress :value="progressValue" :max="duration"></progress>
      <div class="count-down">{{ countDown }}</div>
    </div>
  </div>
</template>

<script setup>
import iconPath from '@/utils/iconPath.js'
import { secondsToMMSS } from '@/utils/timeHandler.js'
import { computed } from 'vue'
const props = defineProps({
  iconName: String,
  seconds: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 60
  }
})

const progressValue = computed(() => {
  if (props.duration >= props.seconds) {
    return props.seconds
  } else {
    return props.seconds % props.duration
  }
})

const countDown = computed(() => {
  return secondsToMMSS(props.duration - progressValue.value)
})

const countDownColor = computed(() => {
  let v = props.duration - progressValue.value
  if (30 < v) {
    return '#ffffff'
  } else if (10 <= v && v <= 30) {
    return '#fa7e23'
  } else {
    return '#e4393c'
  }
})
</script>

<style lang="scss" scoped>
.rune-box {
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 0;

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
    z-index: -1;

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
      z-index: 10;
      top: 3px;
      left: calc(50% - 16px);
      font-size: 12px;
      font-weight: 600;
      text-align: right;
      text-shadow: 0 0 2px #000;
      color: v-bind(countDownColor);
    }
  }
}
</style>
