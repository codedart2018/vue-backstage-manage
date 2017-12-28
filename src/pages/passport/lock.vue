<style src="@/assets/styles/passport/lock.less" lang="less" scoped></style>
<template>
  <div class="container">
    <div class="lock">
      <div class="wrapper clear-fix">
        <div class="unlock-box" :style="{marginLeft: avatorLeft}" @click="passwordShow=true">
          <img class="unlock-img" src="https://avatars1.githubusercontent.com/u/19198355?s=400&u=aa18d8f6d07dbd4f8f4dd966f3fbb2b3a1b3ee00&v=4">
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
        avatorLeft: '0px',
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
          this.request('AdminLogin', {password: this.password}).then((res) => {
            if (res.status) {
              this.avatorLeft = '0px';
              this.inputLeft = '400px';
              this.password = '';
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
