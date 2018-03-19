<style lang="less" scoped>
  @import '../../assets/styles/user/detail.less';
</style>

<template>
  <div class="user-warp">
    <div class="form">
      <dl class="line">
        <dt>UID/CenterId：</dt>
        <dd>
          <label>{{userFrom.id}} / {{userFrom.centerId}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>openID：</dt>
        <dd>
          <label>{{userFrom.openid}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>呢称：</dt>
        <dd>
          <label>{{userFrom.nickname}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt><b class="red">*</b> 真实姓名：</dt>
        <dd>
          <Input v-model="userFrom.realName" placeholder="真实姓名..." style="width: 300px"></Input>
          <label></label>
        </dd>
      </dl>
      <dl class="line">
        <dt>手机号：</dt>
        <dd>
          <label>18580157208</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>性别：</dt>
        <dd>
          <RadioGroup v-model="userFrom.gender">
            <Radio label="0">未知</Radio>
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </RadioGroup>
          <label></label>
        </dd>
      </dl>
      <dl class="line">
        <dt>出生日期：</dt>
        <dd>
          <DatePicker type="date" :value="userFrom.birthday" placeholder="Select date" style="width: 200px"></DatePicker>
          <label></label>
        </dd>
      </dl>
      <dl class="line">
        <dt>地址：</dt>
        <dd>
          <label>  {{userFrom.address}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>积分：</dt>
        <dd>
          <label>{{userFrom.integral}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>余额：</dt>
        <dd>
          <label>{{$formatMoney($accDiv(userFrom.balance, 100), 2)}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>VIP等级：</dt>
        <dd>
          <label>{{userFrom.vipLevel}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>是否关注：</dt>
        <dd>
          <label v-if="userFrom.subscribe === 1">已关注</label>
          <label v-else>未关注</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>关注时间：</dt>
        <dd>
          <label>{{$formatDate(userFrom.subscribeTime)}}</label>
        </dd>
      </dl>
      <dl class="line">
        <dt>创建时间：</dt>
        <dd>
          <label>{{$formatDate(userFrom.createTime)}}</label>
        </dd>
      </dl>
      <div style="text-align:center; margin-top: 15px;">
        <Button @click="goBack">返回</Button>
        <Button type="primary">确定</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
        userFrom: {
          nickname: '',
          openid: '',
          address: '',
          vipLevel: '0',
          subscribe: 1,
          balance: 0,
          integral: 0,
          realName: '',
          gender: '0',
          birthday: '1970-01-01',
          subscribeTime: '1503744672',
          createTime: '1503744672'
        }
      };
    },
    methods: {
      getData() {
        this.request('UserDetail', {uid: this.$route.params.id}, true).then((res) => {
          if (res.status) {
            this.userFrom = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>
