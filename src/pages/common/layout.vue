<style src="@/assets/styles/layout/index.less" lang="less" scoped></style>
<template>
  <div class="app-wrapper">
    <div class="nav-header">头部信息</div>
    <div class="container">
      <div class="left-sidebar">
        左边
      </div>
      <div class="right-sidebar">
        <div style="height: 1500px; border: 1px solid #dedede">
          this is template body
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'hello vue'
      };
    },
    components: {}
  };
</script>
