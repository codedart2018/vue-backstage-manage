<style src="@/assets/styles/passport/login.less" lang="less" scoped></style>
<template>
  <div class="container">
    <header class="login-header">
      <!--<img class="logo" alt="" src="">-->
      <div style="height: 100px;"></div>
      <h1 class="title">永川优生活商家总端管理平台</h1>
    </header>
    <main class="login-main-box">
      <div class="left">
        <div class="scan-qr-code">
          <img class="img" alt="" src="../../assets/images/qr-code.jpg">
          <p class="text">微信扫一扫，即刻登陆</p>
        </div>
      </div>
      <div class="right">
        <Form ref="formLogin" class="login-form" :model="formLogin" :rules="ruleValidate">
          <h2 class="title">登录
            <small>（中心）</small>
          </h2>
          <FormItem prop="account">
            <Input v-model="formLogin.account" placeholder="帐号 / 手机号" @on-enter="handleSubmit">
              <span slot="prepend">
                <Icon :size="20"type="android-person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formLogin.password" placeholder="请输入密码" @on-enter="handleSubmit">
              <span slot="prepend">
                <Icon :size="20" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="code" class="verify-code">
            <Input v-model="formLogin.code" placeholder="请输入验证码" @on-enter="handleSubmit">
              <span slot="prepend">
                <Icon :size="20" type="image"></Icon>
              </span>
            </Input>
            <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
          </FormItem>
          <FormItem>
            <div class="login-button" @click="handleSubmit">立即登陆</div>
            <!--<p class="register">没有账号？<a href="" target="_blank">免费申请</a></p>-->
          </FormItem>
        </Form>
      </div>
    </main>
    <footer class="login-footer">
      <ul class="links">
        <li><a class="link" href="" target="_blank">官方网站</a></li>
        <li><a class="link" href="" target="_blank">关于我们</a></li>
      </ul>
      <p class="copyright">Copyright © 2009-2018 yongchuan.cc Inc. All rights reserved. {{$store.state.SiteConfig.data.icp}}</p>
    </footer>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  export default {
    name: 'Login',
    data () {
      return {
        formLogin: {
          account: 'admin',
          password: '123456',
          code: ''
        },
        ruleValidate: {
          account: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {type: 'string', message: '验证码只能英文数字', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
          ]
        },
        verifyUrl: ''
      };
    },
    components: {
    },
    methods: {
      ...mapActions(['addSideMenu', 'userLogin']),
      handleSubmit () {
        this.$refs.formLogin.validate((valid) => {
          if (valid) {
            setTimeout(() => {
              this.request('AdminLogin', this.formLogin).then((res) => {
                if (res.status) {
                  let data = res.data;
                  let userData = {userInfo: data.userInfo, token: data.token};
                  this.userLogin(userData);
                  //store 菜单
                  this.addSideMenu(data.menu);
                  //this.$store.commit('ADD_SIDE_MENU', res.data.menu);
                  this.$Message.success('登录成功!');
                  this.$router.push({path: '/'});
                } else {
                  this.$Message.error(res.msg);
                }
              }).catch((e) => {
                console.log(e);
              });
            }, 500);
          }
        });
      },
      handleReset () {
        this.$refs.formLogin.resetFields();
      },
      //刷新切换验证码
      refreshVerify() {
        this.verifyUrl = '';
        setTimeout(() => {
          this.verifyUrl = '/admin/passport/code?v=' + Math.random() * 1000;
        }, 500);
      }
    },
    mounted() {},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例'
        //解决进入路由不刷新验证码问题
        vm.verifyUrl = '/admin/passport/code?v=' + Math.random() * 1000;
      });
    }
  };
</script>


