<style src="@/assets/styles/passport/lock.less" lang="less" scoped></style>
<template>
  <div class="container">
    <div class="lock">
      <div class="wrapper clear-fix">
        <div class="unlock-box" :style="{marginLeft: avatorLeft}">
          <img class="unlock-img" src="https://avatars1.githubusercontent.com/u/19198355?s=400&u=aa18d8f6d07dbd4f8f4dd966f3fbb2b3a1b3ee00&v=4">
          <div class="unlock-cover">
            <span><Icon type="unlocked" :size="30"></Icon></span>
            <p>解锁</p>
          </div>
        </div>
        <div class="input-wrapper">
          <input class="input" ref="input" :autofocus="true" v-model="password" placeholder="登录密码"
                 @keyup.enter="handleUnlock"
                 type="password">
          <span class="underline"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Avatar, Icon, Message} from 'iview';
  export default {
    name: 'Unlock',
    data () {
      return {
        avatorLeft: '0px',
        inputLeft: '400px',
        password: '',
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
              Message.error(res.msg);
            }
          }).catch(() => {});
        } else {
          Message.error('请输入正确密码');
        }
      }
    },
    mounted () {
    },
    components: {
      'Avatar': Avatar,
      'Icon': Icon
    }
  };
</script>
