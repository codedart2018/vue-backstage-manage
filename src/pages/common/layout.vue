<style src="@/assets/styles/layout/index.less" lang="less" scoped></style>
<template>
  <div class="app-wrapper">
    <div class="nav-header">
      <div class="left-area">
        <div style="height:50px;" class="logo">
          <img :src="require('@/assets/images/logo.png')" alt="LOGO" height="50">
          <img :src="require('@/assets/images/mini-logo.png')" alt="LOGO" height="40" width="40" style="position: absolute; top: 5px; left: 0; display: none">
        </div>
      </div>
      <div class="right-area">
        <div class="expand-screen" @click="toggleScreen">
          <Tooltip placement="bottom" class="tool-tip" :content="tipContent" :delay="1000">
            <Icon type="android-expand" v-if="!screen"></Icon>
            <Icon type="android-contract" v-if="screen"></Icon>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left-sidebar" :class="{'mini-left-sidebar':!sidebarStatus}">
        <div class="sidebar-fold" @click="toggleSideBar" title="收缩菜单">
          <Icon type="navicon"></Icon>
        </div>
        <div class="menu">
          <IMenu active-name="1-2" :open-names="['1', '2', '3', '4']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                内容管理
              </template>
              <IMenuItem name="1-1">文章管理</IMenuItem>
              <IMenuItem name="1-2">评论管理</IMenuItem>
              <IMenuItem name="1-3">举报管理</IMenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-people"></Icon>
                用户管理
              </template>
              <IMenuItem name="2-1">新增用户</IMenuItem>
              <IMenuItem name="2-2">活跃用户</IMenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="stats-bars"></Icon>
                统计分析
              </template>
              <MenuGroup title="使用">
                <IMenuItem name="3-1">新增和启动</IMenuItem>
                <IMenuItem name="3-2">活跃分析</IMenuItem>
                <IMenuItem name="3-3">时段分析</IMenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                <IMenuItem name="3-4">用户留存</IMenuItem>
                <IMenuItem name="3-5">流失用户</IMenuItem>
              </MenuGroup>
              <MenuGroup title="好人呀">
                <IMenuItem name="3-6">用户留存</IMenuItem>
                <IMenuItem name="3-7">流失用户</IMenuItem>
                <IMenuItem name="3-8">流失用户</IMenuItem>
                <IMenuItem name="3-9">流失用户</IMenuItem>
                <IMenuItem name="3-10">流失用户</IMenuItem>
                <IMenuItem name="3-11">流失用户</IMenuItem>
              </MenuGroup>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-people"></Icon>
                粉丝管理
              </template>
              <IMenuItem name="4-1">新增用户</IMenuItem>
              <IMenuItem name="4-2">活跃用户</IMenuItem>
            </Submenu>
          </IMenu>
        </div>
      </div>
      <div class="right-sidebar">
        <div style="height: 1500px;">
          this is template body
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Tooltip, Icon, Menu} from 'iview';
  export default {
    data () {
      return {
      	screen: false,
        tipContent: '全屏',
        //测动块状态
        sidebarStatus: true
      };
    },
    methods: {
    	//切换左边滑动块
      toggleSideBar () {
        this.sidebarStatus = !this.sidebarStatus;
        console.log(this.sidebarStatus);
      },
      //全屏切换
      toggleScreen () {
        if (!this.screen) {
          let docElm = document.documentElement;
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
        this.tipContent = this.screen ? '缩小' : '全屏';
      }
    },
    components: {
      'Tooltip': Tooltip,
      'Icon': Icon,
      'IMenu': Menu,
      'Submenu': Menu.Sub,
      'IMenuItem': Menu.Item,
      'MenuGroup': Menu.Group
    }
  };
</script>
