<style src="@/assets/styles/shop/detail.less" lang="less" scoped></style>
<template>
  <Card dis-hover>
    <Form ref="data" :model="data" :rules="ruleValidate" :label-width="110">
      <Row>
        <Col span="8">
          <Row style="margin-bottom: 24px;">
            <Col span="24">
              <span style="font-size: 16px; color: #657180;">基本信息</span>
            </Col>
          </Row>
          <Form-item label="商户名称">
            {{data.name}}
          </Form-item>
          <Form-item label="管理员帐号">
            {{data.account}}
          </Form-item>
          <Form-item label="商户有效期">
            <div v-if="data.validity == 0">长期有效</div>
            <div v-if="data.validity != 0">{{$formatDate(data.validity, 'yyyy-MM-dd h:m')}}</div>
          </Form-item>
          <Form-item label="创建时间">
            <div>{{$formatDate(data.create_time, 'yyyy-MM-dd h:m')}}</div>
          </Form-item>
          <Row style="margin-bottom: 24px;">
            <Col span="24">
            <span style="font-size: 16px; color: #657180;">联系信息</span></Col>
          </Row>
          <Form-item label="联系人" prop="contacts">
            <Input v-model="data.contacts" placeholder="请填写联系人"></Input>
          </Form-item>
          <Form-item label="联系电话" prop="tel">
            <Input v-model="data.phone" placeholder="请填写电话号码"></Input>
          </Form-item>
          <Form-item label="联系邮箱" prop="email">
            <Input v-model="data.email" placeholder="请填写邮箱地址"></Input>
          </Form-item>
          <Form-item label="商铺备注" prop="desc">
            <Input v-model="data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="商铺200字简要说明(后台备注,前台无法浏览)..."></Input>
          </Form-item>
          </Col>
          <Col span="1">&nbsp;</Col>
          <Col span="8">
          <Row style="margin-bottom: 24px;">
            <Col span="24">
              <span style="font-size: 16px; color: #657180;">商铺信息</span>
            </Col>
          </Row>
          <Form-item label="商铺地址">
            <Input v-model="data.address" placeholder="请填写商铺地址"></Input>
          </Form-item>
          <Form-item label="电话1">
            <Input v-model="data.phone1" placeholder="请填写电话1"></Input>
          </Form-item>
          <Form-item label="电话2">
            <Input v-model="data.phone2" placeholder="请填写电话2"></Input>
          </Form-item>
          <FormItem label="店铺状态" prop="status">
            <RadioGroup v-model="data.status">
              <Radio label="0">锁定</Radio>
              <Radio label="1">正常</Radio>
              <Radio label="2">休店</Radio>
              <Radio label="3">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <Row style="margin-bottom: 24px;">
            <Col span="24">
              <span style="font-size: 16px; color: #657180;">财务信息</span>
            </Col>
          </Row>
          <Form-item label="余额">
            {{data.balance}}
          </Form-item>
        </Col>
        <Col span="1">&nbsp;</Col>
        <Col span="6">
        <Row style="margin-bottom: 24px;">
          <Col span="24">
          <span style="font-size: 16px; color: #657180;">快捷面板</span></Col>
        </Row>
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="4" class="col-plan">
            <div class="box">
              <div class="item">
                <Icon type="social-yen" class="icon"></Icon>
              </div>
              <div class="item" style="">财务明细</div>
            </div>
          </Col>
          <Col span="4" class="col-plan">
            <div class="box">
              <div class="item">
                <Icon type="clipboard" class="icon"></Icon>
              </div>
              <div class="item" style="">操作日志</div>
            </div>
          </Col>
          <Col span="4" class="col-plan">
            <div class="box">
              <div class="item">
                <Icon type="person-stalker" class="icon"></Icon>
              </div>
              <div class="item" style="">商铺管理员</div>
            </div>
          </Col>
        </Row>
        </Col>
      </Row>
      <Row>
        <Col span="4" push="20">
          <Form-item>
            <Button type="primary" @click="handleSubmit('data')" style="margin-left: 8px">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click="goBack()">返回</Button>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </Card>
</template>

<script>
  export default {
    data () {
      return {
        data: {
          name: '',
          mail: '',
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          mail: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getData () {
        let id = this.$route.params.id;
        this.request('ShopDetail', {id: id}, true).then((res) => {
          if (res.status) {
            //数据
            this.data = res.data;
          }
        }).catch((response) => {});
      },
      //后退海阔天空
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      //debugger;
      //服务端获取数据
      this.getData();
    }
  };
</script>
