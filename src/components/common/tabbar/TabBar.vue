<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style>
#tab-bar {
  display: flex;
  /* 固定设置 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  font-size: 14px;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
</style>