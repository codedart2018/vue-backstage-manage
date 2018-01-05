<style src="@/assets/styles/passport/lock.less" lang="less" scoped></style>
<template>
  <div class="container">
    <div class="lock">
      <div class="wrapper clear-fix">
        <div class="unlock-box" :style="{marginLeft: avatarLeft}" @click="passwordShow=true">
          <img class="unlock-img" :src="userInfo.avatarUrl">
          <div class="unlock-cover">
            <span><Icon type="unlocked" :size="30"></Icon></span>
            <p>解锁</p>
          </div>
        </div>
        <div class="input-wrapper" v-if="passwordShow">
          <input class="input" ref="input" :autofocus="true" v-model="password" :placeholder="placeholder"
                 @keyup.enter="handleUnlock"
                 @blur="onBlur"
                 @focus="onFocus"
                 type="password">
          <span class="underline"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Unlock',
    data () {
      return {
        userInfo: this.$store.state.ManageUser.userInfo,
        avatarLeft: '0px',
        inputLeft: '400px',
        password: '',
        placeholder: '请输入登录密码',
        passwordShow: false
      };
    },
    methods: {
      handleUnlock () {
        if (this.password) {
        	//发起后端验证
          this.request('AdminUnlock', {uid: this.userInfo.uid, password: this.password}).then((res) => {
            if (res.status) {
              this.avatarLeft = '0px';
              this.inputLeft = '400px';
              this.password = '';
              this.$router.push({path: '/'});
              this.$store.commit('SET_LOGIN_TOKEN', res.data.token);
              this.$Message.success(res.msg);
            } else {
              this.$Message.error(res.msg);
            }
          }).catch(() => {});
        } else {
          this.$Message.error('请输入正确密码');
        }
      },
      onBlur () {
      	this.placeholder = '请输入登录密码';
      },
      onFocus () {
        this.placeholder = '回车确认登陆';
      }
    },
    mounted () {
    	//检查是否有用户信息 如果没有直接跳到登陆界面去
      let user = JSON.parse(window.localStorage.getItem('sideMenuList'));
      let token = window.localStorage.getItem('loginToken');
      if (user && token) {
        this.$router.push({path: '/'});
      }
      if (!token && !user) {
        this.$router.push({path: '/passport/login'});
      }
    },
    components: {
    }
  };
</script>
