<template>
  <div>
    <Row class="mb-15">
      <i-col span="18" class="search">
        <Form :model="formSearch" :label-width="80" inline label-position="right">
          <Form-item label="服务名称：">
            <Input v-model="formSearch.name" placeholder="请输入服务名称"></Input>
          </Form-item>
          <Form-item label="服务类型：">
            <Select v-model="formSearch.type" placeholder="请选择" style="width: 150px;">
              <Option value="">请选择</Option>
              <Option value="1">短信</Option>
              <Option value="2">邮件</Option>
            </Select>
          </Form-item>
          <Form-item label="服务状态：">
            <Select v-model="formSearch.status" placeholder="请选择" style="width: 150px;">
              <Option value="">请选择</Option>
              <Option value="1">正常</Option>
              <Option value="2">关闭</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="ghost" @click="clearSearch()">清空条件</Button>
          </Form-item>
        </Form>
      </i-col>
      <i-col span="6" class="text-align-right">
        <Button type="primary" @click="addModal = true">
          <Icon type="plus-round"></Icon>&nbsp;添加服务
        </Button>
      </i-col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
    </Row>

    <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="添加服务" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="120">
          <Form-item label="服务名称" prop="name">
            <Input v-model="addForm.name" placeholder="请填写服务名称"></Input>
          </Form-item>
          <Form-item label="模板ID" prop="templateId">
            <Input v-model="addForm.templateId" placeholder="请去模板管理里查找并填写正确ID"></Input>
          </Form-item>
          <Form-item label="消息类型" prop="type">
            <Select v-model="addForm.type" placeholder="请选择" @on-change="selectType">
              <Option value="">请选择</Option>
              <Option value="1">短信</Option>
              <Option value="2">邮件</Option>
            </Select>
          </Form-item>
          <Form-item label="服务状态" prop="status">
            <Radio-group v-model="addForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">关闭</Radio>
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
      <div slot="header" class="ivu-modal-header-inner">编辑模板</div>
      <div>
        <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="120">
          <Form-item label="服务名称" prop="name">
            <Input v-model="editForm.name" placeholder="请填写服务名称"></Input>
          </Form-item>
          <Form-item label="模板ID" prop="templateId">
            <Input v-model="editForm.templateId" placeholder="请去模板管理里查找并填写正确ID"></Input>
          </Form-item>
          <Form-item label="消息类型" prop="type">
            <Select v-model="editForm.type" placeholder="请选择" @on-change="selectType">
              <Option value="">请选择</Option>
              <Option value="1">短信</Option>
              <Option value="2">邮件</Option>
            </Select>
          </Form-item>
          <Form-item label="服务状态" prop="status">
            <Radio-group v-model="editForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">关闭</Radio>
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

<script>
  export default {
    data () {
      //验证正整数 自带的 number integer 好像有问题
      const validateTemplateId = (rule, value, callback) => {
        if (value) {
          let reg = /^[1-9]?[0-9]+$/;
          if (!reg.test(value)) {
            callback(new Error('模板ID只能填写正正数'));
          }
        }
        callback();
      };
      return {
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 60
          },
          {
            title: '模板ID',
            key: 'templateId',
            width: 100
          },
          {
            title: '服务名称',
            align: 'left',
            key: 'name',
            render: (h, params) => {
              const row = params.row;
              return h('div', {
                style: {
                  textAlign: 'left'
                }
              }, row.name);
            }
          },
          {
            title: '类型',
            width: 80,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const text = row.type === '1' ? '短信' : row.type === '2' ? '邮件' : '未知';
              return h('div', text);
            }
          },
          {
            title: '状态',
            key: 'status',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === '1' ? 'green' : row.status === '0' ? 'yellow' : 'red';
              const text = row.status === '1' ? '正常' : row.status === '0' ? '关闭' : '删除';
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '添加时间',
            key: 'createTime',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$formatDate(params.row.createTime, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '操作',
            key: 'operation',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(params.index, params.row.id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        //列表数据
        list: [],
        //总共数据多少条
        total: 0,
        //每页多少条数据
        pageSize: 1,
        addForm: {
          name: '',
          templateId: '',
          type: '',
          status: '1'
        },
        //验证规则
        ruleValidate: {
          name: [
            {required: true, message: '模板名称不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '模板名称不能少于2个字符', trigger: 'blur'},
            {type: 'string', max: 20, message: '模板名称不能大于20个字符', trigger: 'blur'}
          ],
          templateId: [
            {required: true, message: '请填写模板ID', trigger: 'blur'},
            {validator: validateTemplateId, trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ]
        },
        //搜索表单
        formSearch: {},
        //编辑表单
        editForm: {},
        //添加 modal
        addModal: false,
        //编辑 modal
        editModal: false
      };
    },
    methods: {
      //取消 modal
      modalCancel() {
        this.editModal = false;
      },
      //添加数据
      addSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('MessageServicesAdd', this.addForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      //修改数据
      editSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('MessageServicesEdit', this.editForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      //重置表单数据
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      //分页切换页码
      changePage (page) {
        let search = this.formSearch;
        let query = Object.assign({page: page}, search);
        //分页
        this.$router.push({name: this.$router.currentRoute.name, query: query});
        //获取最新数据
        this.getData({page: page, params: search});
      },
      getData (params) {
        if (!params) params = {page: 1};
        this.request('MessageServicesIndex', params, true).then((res) => {
          if (res.status) {
            //列表数据
            this.list = res.data.list;
            //总页数
            this.total = res.data.count;
            //每页多少条数据
            this.pageSize = res.data.size;
          } else {
            //列表数据
            this.list = [];
            //总页数
            this.total = 0;
            //每页多少条数据
            this.pageSize = 0;
          }
        }).catch((response) => {
        });
      },
      edit (index) {
        //打开 modal 窗口
        this.editModal = true;
        //获取原数据
        this.editForm = this.list[index];
      },
      //删除模板数据
      del (index, id) {
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>你确定要删除?删除后不可恢复!</p>',
          loading: true,
          onOk: () => {
            this.request('MessageServicesDelete', {id: id}).then((res) => {
              if (res.status) {
                this.$Message.info(res.msg);
                this.$Modal.remove();
                this.list.splice(index, 1);
              } else {
                this.$Message.error(res.msg);
                this.$Modal.remove();
              }
            });
          }
        });
      },
      //表单搜索
      search() {
        this.pageNumber = 1;
        let search = this.formSearch;
        this.getData({params: search});
        //暂时不做关键词显示在路由上
        //this.$router.push({name: this.$router.currentRoute.name, query: {page: page}});
      },
      //清除搜索
      clearSearch() {
        this.formSearch = {};
        this.getData();
      },
      //保存数据方法
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
      },
      selectServices (value) {
        if (value !== '') {
          this.$refs.addForm.validateField('services');
          this.$refs.editForm.validateField('services');
        }
      },
      selectType (value) {
        if (value !== '') {
          this.$refs.addForm.validateField('type');
          this.$refs.editForm.validateField('type');
        }
      }
    },
    mounted() {
      //服务端获取数据
      this.getData();
    }
  };
</script>
