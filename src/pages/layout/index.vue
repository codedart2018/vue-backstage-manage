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
      <div class="center-area flex-row-center">
        <div class="home">
          <Icon type="home"></Icon>
        </div>
        <div class="quick-panel" @click="testChangeOpenNames">
          <span>快捷面板</span>
        </div>
      </div>
      <div class="right-area">
        <!--通知信息-->
        <div class="notice flex-row-center">
          <Tooltip placement="bottom" content="9条通知">
            <Icon type="ios-bell" class="bell"></Icon>
            <span class="bell-num">9</span>
          </Tooltip>
        </div>
        <!-- 用户信息 -->
        <div class="user-info">
          <Dropdown>
            <div><span>Hello World</span><Icon type="arrow-down-b"></Icon></div>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="modalUser=true">个人信息</DropdownItem>
              <DropdownItem @click.native="modal = true">退出登录</DropdownItem>
              <DropdownItem @click.native="screenLock">锁定屏幕</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--头像-->
          <div class="avatar">
            <Avatar src="https://avatars.githubusercontent.com/u/12706830?v=3"/>
          </div>
        </div>
        <!--退出登陆-->
        <div class="login-out flex-row-center" @click="modal = true">
          <Tooltip placement="bottom" content="退出登陆" :delay="500">
            <Icon type="log-out"></Icon>
          </Tooltip>
        </div>
        <!--屏幕伸缩-->
        <div class="expand-screen flex-row-center" @click="toggleScreen">
          <Tooltip placement="left" :content="tipContent" :delay="500">
            <Icon type="arrow-expand" v-if="!screen"></Icon>
            <Icon type="arrow-shrink" v-if="screen"></Icon>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left-sidebar dark-theme" :class="{'mini-left-sidebar': !sidebarStatus}">
        <div class="sidebar-fold" @click="toggleSideBar" title="收缩菜单">
          <Icon type="navicon"></Icon>
        </div>
        <!--导航菜单-->
        <div class="menu">
          <ShrinkMenu :menu-list="menuList" :open-names="openedSubmenu" @on-change="handleSubmenuChange"></ShrinkMenu>
        </div>
      </div>
      <div class="right-sidebar">
        <div class="tags-con">
          <TabsMenu :pageTagsList="pageTagsList"></TabsMenu>
        </div>

        <div class="common-area">
          <div style="height: 1500px;">
            this is template body
            <router-view></router-view>
          </div>
        </div>
        <div class="copyright-footer">©copyright by codeRabbit</div>
      </div>
    </div>

    <!--modal 提示-->
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <p>您确认要退出?退出后将无法操作哦!</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modalLoading" @click="signOut" style="background: #09C">确认退出</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import TabsMenu from './tabs-menu.vue';
  import ShrinkMenu from './shrink-menu.vue';

  export default {
    data () {
      return {
      	screen: false,
        tipContent: '全屏',
        //sidebar bold state
        sidebarStatus: true,
        //pop modal
        modal: false,
        //modal loading
        modalLoading: false,
        //menu list data
        menuList: this.$store.state.SideMenu.sideMenuList,
        openedSubmenu: [],
        openNames: ['2'],
        activeName: '2-1',
        //demo
        pageTagsList: this.$store.state.NavigationTags.listData
      };
    },
    methods: {
      //change sidebar bold block
      toggleSideBar () {
      	return false;
        //this.sidebarStatus = !this.sidebarStatus;
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
      },
      //sign out function
      signOut () {
        this.modalLoading = true;
        setTimeout(() => {
          this.modalLoading = false;
          this.modal = false;
          this.$store.commit('DEL_SIDE_MENU');
          window.localStorage.removeItem('loginToken');
          window.localStorage.removeItem('userInfo');
          this.$router.push({path: '/passport/login'});
        }, 1000);
      },
      //change menus
      handleSubmenuChange (val) {
        console.log(val);
        this.openedSubmenu.push(val);
      },
      screenLock () {
        window.localStorage.removeItem('loginToken');
        this.$router.push({path: '/passport/lock'});
      },
      testChangeOpenNames () {
      }
    },
    updated () {
      this.$nextTick(() => {
      });
    },
    components: {
      'TabsMenu': TabsMenu,
      'ShrinkMenu': ShrinkMenu
    },
    mounted() {
    }
  };
</script>
