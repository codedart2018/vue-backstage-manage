<style src="@/assets/styles/passport/login.less" lang="less" scoped></style>
<template>
  <div class="container merchant-login">
    <div class="login">
      <div class="welcome">永川优生活商家总端管理平台</div>
      <div class="form-box">
        <Form ref="formLogin" :model="formLogin" :rules="ruleValidate">
          <FormItem prop="account">
            <Input v-model="formLogin.account" placeholder="帐号 / 手机号" @on-enter="handleSubmit">
            <span slot="prepend">
              <Icon :size="16" type="person"></Icon>
            </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formLogin.password" placeholder="请输入密码" @on-enter="handleSubmit">
            <span slot="prepend">
              <Icon :size="14" type="locked"></Icon>
            </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" type="primary" long :loading="modalLoading">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
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
        modalLoading: false
      };
    },
    methods: {
      ...mapActions(['addSideMenu']),
      handleSubmit () {
        this.$refs.formLogin.validate((valid) => {
          this.modalLoading = true;
          if (valid) {
            setTimeout(() => {
              this.request('AdminLogin', this.formLogin).then((res) => {
                this.modalLoading = false;
                if (res.status) {
                  //window.localStorage.setItem('sideMenuList', JSON.stringify(res.data.menu));
                  //用户信息应该走store 暂时不走
                  window.localStorage.setItem('userInfo', JSON.stringify(res.data.user_info));
                	window.localStorage.setItem('loginToken', res.data.token);
                  this.$Message.success('登录成功!');
                  //store 菜单
                  this.addSideMenu(res.data.menu);
                  //this.$store.commit('ADD_SIDE_MENU', res.data.menu);
                  this.$router.push({path: '/'});
                } else {
                  this.$Message.error(res.msg);
                }
              }).catch((e) => {
                this.modalLoading = false;
                console.log(e);
              });
            }, 500);
          }
        });
      },
      handleReset () {
        this.$refs.formLogin.resetFields();
      }
    },
    components: {
    }
  };
</script>


