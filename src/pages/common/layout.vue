<style src="@/assets/styles/layout/index.less" lang="less" scoped></style>
<template>
  <div class="app-wrapper">
    <div class="nav-header">
      <div class="logo-area">logo 区域</div>
      <div class="right-area">
        <div class="expand-screen" @click="toggleScreen">
          <Tooltip placement="bottom" content="全屏">
            <Icon type="android-expand" v-if="!screen"></Icon>
            <Icon type="android-contract" v-if="screen"></Icon>
          </Tooltip>
        </div>
      </div>
    </div>
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
  import {Tooltip, Icon} from 'iview';
  export default {
    data () {
      return {screen: false};
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar');
      },
      toggleScreen () {
        if (!this.screen) {
          var docElm = document.documentElement;
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
          } else {
            this.$Message.error({content: '除了让你升级浏览器对方没什么好说的！', duration: 3});
          }
          this.screen = true;
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else {
            this.$Message.error({content: '请升级浏览器，不然我是不会理你的！', duration: 3});
          }
          this.screen = false;
        }
      }
    },
    components: {
      'Tooltip': Tooltip,
      'Icon': Icon
    }
  };
</script>
