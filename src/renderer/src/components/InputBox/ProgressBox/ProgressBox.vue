<template>
  <div class="progress-box">
    <img class="icon" :src="props.url" alt="" />
  </div>
</template>

<script setup>
const props = defineProps({
  url: String, // 图片地址
  duration: Number // 时长
})
console.log(props.url)
</script>

<style lang="scss" scoped>
.progress-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>
