<template>
  <div class="input-box">
    <div>
      <div>
        <slot name="prepend"></slot>
      </div>
      <input type="text" />
      <div>
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
