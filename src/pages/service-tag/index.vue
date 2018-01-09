<template>
  <div class="service-tag-box">
    <Row class="mb-15">
      <Col span="18" class="search">
      &nbsp;
      </Col>
      <Col span="6" class="text-align-right">
      <Button type="primary" @click="addModal = true">
        <Icon type="plus-round"></Icon>&nbsp;添加标签
      </Button>
      </Col>
    </Row>
    <Row type="flex" justify="start" class="code-row-bg">
      <Col span="2" v-for="(item, index) in data" :key="index">
        <div class="icons-item" @click="edit(index)">
          <i :class="'icon-font ' + item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </Col>
    </Row>
    <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="添加服务标签" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
          <Form-item label="标签名称" prop="name">
            <Input v-model="addForm.name" placeholder="请填写标签名称"></Input>
          </Form-item>
          <Form-item label="ICON名称" prop="icon">
            <Input v-model="addForm.icon" placeholder="请填写ICON名称"></Input>
          </Form-item>
          <Form-item label="标签排序" prop="sort">
            <Input v-model="addForm.sort" placeholder="数字越大排序越前"></Input>
          </Form-item>
          <Form-item label="标签状态" prop="status">
            <Radio-group v-model="addForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addSubmit('addForm')">提交</Button>
        <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>

    <!--编辑 Modal 对话框-->
    <Modal v-model="editModal" class-name="customize-modal-center">
      <div slot="header" class="ivu-modal-header-inner">编辑服务标签</div>
      <div>
        <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
          <Form-item label="标签名称" prop="name">
            <Input v-model="editForm.name" placeholder="请填写标签名称"></Input>
          </Form-item>
          <Form-item label="ICON名称" prop="icon">
            <Input v-model="editForm.icon" placeholder="请填写ICON名称"></Input>
          </Form-item>
          <Form-item label="标签排序" prop="sort">
            <Input v-model="editForm.sort" placeholder="数字越大排序越前"></Input>
          </Form-item>
          <Form-item label="标签状态" prop="status">
            <Radio-group v-model="editForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="editSubmit('editForm')">提交</Button>
        <Button type="ghost" @click="modalCancel()" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<style>
  .service-tag-box {
    overflow: hidden;
  }

  .icons-item {
    margin: 0 0 15px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #5c6b77;
  }

  .icons-item:hover {
    cursor: pointer;
    background-color: #f8f8f8
  }

  .icons-item i {
    font-size: 30px;
  }

  .icons-item span {
    display: block;
  }
</style>
<script>
  export default{
    data () {
      return {
        data: [],
        addForm: {
          name: '',
          icon: '',
          status: 1
        },
        editForm: {},
        addModal: false,
        editModal: false,
        ruleValidate: {
          name: [
            {required: true, message: '标签名称不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '标签名称不能少于2个字符', trigger: 'blur'}
          ],
          icon: [
            {required: true, message: 'ICON名称不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: 'ICON名称不能少于2个字符', trigger: 'blur'},
            {type: 'string', message: 'ICON名称只能英文小写加下划线', trigger: 'blur', pattern: /^[a-z0-9-_]+$/}
          ],
          sort: [
            {type: 'string', message: '排序只能数字', trigger: 'blur', pattern: /^[0-9]+$/}
          ]
        }
      };
    },
    components: {},
    methods: {
      getData () {
        this.request('ServiceTag', {}, true).then((res) => {
          if (res.status) {
            //数据
            this.data = res.data;
          }
        }).catch((response) => {});
      },
      modalCancel() {
        this.editModal = false;
      },
      edit (index) {
        this.editModal = true;
        this.editForm = this.data[index];
      },
      addSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('ServiceTagAdd', this.addForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      editSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('ServiceTagEdit', this.editForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      save(url, data) {
        this.request(url, data).then((res) => {
          if (res.status) {
            this.addModal = false;
            this.editModal = false;
            this.$Message.success(res.msg);
            //重置数据
            this.$refs['addForm'].resetFields();
            this.$refs['editForm'].resetFields();
            //重新拉取服务端数据
            this.getData();
          } else {
            this.$Message.error(res.msg);
          }
        }).catch((response) => {});
      }
    },
    beforeCreate () {},
    create () {},
    beforeMounted () {},
    mounted () {
      this.getData();
    },
    beforeUpdate () {},
    updated () {},
    beforeDestroy () {},
    destroyed () {}
  };
</script>
