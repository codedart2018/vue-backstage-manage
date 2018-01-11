<template>
  <div>
    <Row class="mb-15">
      <Col span="18" class="search">
      <Form :model="formSearch" :label-width="80" inline label-position="right">
        <Form-item label="搜索类型：">
          <Select v-model="formSearch.type" placeholder="请选择" style="width:90px">
            <Option value="">请选择</Option>
            <Option value="1">帐号</Option>
            <Option value="2">联系人</Option>
            <Option value="3">手机号码</Option>
            <Option value="4">邮箱</Option>
          </Select>
        </Form-item>
        <Form-item label="关键词：">
          <Input v-model="formSearch.keywords" placeholder="帐号/手机号/姓名/邮箱"></Input>
        </Form-item>
        <Form-item label="所属角色">
          <Select v-model="formSearch.role_id" placeholder="请选择" style="width:100px">
            <Option value="">请选择</Option>
            <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="状态：">
          <Select v-model="formSearch.status" placeholder="请选择" style="width:70px">
            <Option value="">请选择</Option>
            <Option value="1">正常</Option>
            <Option value="0">锁定</Option>
          </Select>
        </Form-item>
        <Form-item :label-width="1">
          <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
        </Form-item>
      </Form>
      </Col>
      <Col span="6" class="text-align-right">
      <Button type="primary" @click="addModal = true">
        <Icon type="plus-round"></Icon>&nbsp;添加用户
      </Button>
      </Col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
    </Row>
    <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="添加用户" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
          <Form-item label="帐号" prop="account">
            <Input v-model="addForm.account" placeholder="请填写帐号"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input type="password" v-model="addForm.password" placeholder="请填写密码(留空将不会修改密码)"></Input>
          </Form-item>
          <Form-item label="所属角色" prop="role_id">
            <Select v-model="addForm.role_id" placeholder="请选择">
              <Option value="">请选择</Option>
              <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="头像" prop="avatar_id">
            <div class="demo-upload-list">
              <img :src="addForm.avatar_url ? addForm.avatar_url : defaultAvatar">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(addForm.avatar_url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(addForm.avatar_id, '删除成功')"></Icon>
              </div>
            </div>
            <Upload
              ref="upload"
              name="file"
              multiple
              type="drag"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="512"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              action="//up-z2.qiniu.com"
              :data="uploadAvatarParams"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;" @click="uploadType = 'add'">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <Form-item label="姓名" prop="real_name">
            <Input v-model="addForm.real_name" placeholder="请填写姓名"></Input>
          </Form-item>
          <Form-item label="手机号" prop="mobile">
            <Input v-model="addForm.mobile" placeholder="请填写手机号"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="addForm.email" placeholder="请填写邮箱"></Input>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="addForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="备注说明" prop="desc">
            <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字说明备注..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addSubmit('addForm')">提交</Button>
        <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>
    <!--编辑 Modal 对话框-->
    <Modal v-model="editModal" title="编辑用户" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="editForm" :model="editForm" :rules="editRuleValidate" :label-width="80">
          <Form-item label="帐号" prop="account">
            <Input v-model="editForm.account" disabled placeholder="请填写帐号"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input type="password" v-model="editForm.password" placeholder="请填写密码"></Input>
          </Form-item>
          <Form-item label="所属角色" prop="role_id">
            <Select v-model="editForm.role_id" placeholder="请选择">
              <Option value="">请选择</Option>
              <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="头像" prop="avatar_id">
            <div class="demo-upload-list">
              <img :src="editForm.avatar_url ? editForm.avatar_url : defaultAvatar">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(editForm.avatar_url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(editForm.avatar_id, '删除成功')"></Icon>
              </div>
            </div>
            <Upload
              ref="upload"
              name="file"
              multiple
              type="drag"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="512"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              action="https://upload-z2.qiniup.com"
              :data="uploadAvatarParams"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;" @click="uploadType = 'edit'">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </Form-item>
          <Form-item label="姓名" prop="real_name">
            <Input v-model="editForm.real_name" placeholder="请填写姓名"></Input>
          </Form-item>
          <Form-item label="手机号" prop="mobile">
            <Input v-model="editForm.mobile" placeholder="请填写手机号"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="editForm.email" placeholder="请填写邮箱"></Input>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="editForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="备注说明" prop="desc">
            <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字说明备注..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="editSubmit('editForm')">提交</Button>
        <Button type="ghost" @click="modalCancel()" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <!--头像modal-->
    <Modal title="预览头像" v-model="visible">
      <img :src="imgUrl + '?imageView2/1/w/700/h/700'" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<style scoped>
  .search .ivu-form-item {
    margin-bottom: 0px;
    vertical-align: top;
    zoom: 1;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
<script>
  import Util from '../../libs/util';
  export default {
    data () {
      const validatePassword = (rule, value, callback) => {
        if ((this.addModal || value) && (value.length < 6 || value.length > 32)) {
          callback(new Error('密码长度6-32个字符'));
        }
        callback();
      };
      const validateMobile = (rule, value, callback) => {
        if (value) {
          let reg = /^1[34578]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error('手机号码格式不正确'));
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
            title: '帐号',
            key: 'account',
            width: 120
          },
          {
            title: '用户角色',
            key: 'role_name'
          },
          {
            title: '联系人',
            key: 'real_name',
            width: 130
          },
          {
            title: '手机号',
            key: 'mobile',
            align: 'center',
            width: 120
          },
          {
            title: '邮箱',
            key: 'email',
            align: 'center',
            width: 180
          },
          {
            title: '状态',
            key: 'status',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === '1' ? 'green' : row.status === '0' ? 'yellow' : 'red';
              const text = row.status === '1' ? '正常' : row.status === '0' ? '锁定' : '删除';
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '登陆次数',
            key: 'login_count',
            align: 'center'
          },
          {
            title: '最后登陆',
            key: 'last_login_time',
            width: 135,
            align: 'center',
            render: (h, params) => {
              if (params.row.last_login_time === '0') {
                return h('Tag', '从未登陆');
              }
              return h('div', this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '最后登陆IP',
            key: 'last_login_ip',
            width: 135,
            align: 'center'
          },
          {
            title: '添加时间',
            key: 'create_time',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('span', this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '最后更新',
            key: 'update_time',
            align: 'center',
            width: 135,
            render: (h, params) => {
              return h('span', this.$formatDate(params.row.update_time, 'yyyy-MM-dd h:m'));
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
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.restPassword(params.row.id);
                    }
                  }
                }, '重置')
              ]);
            }
          }
        ],
        roles: [],
        //列表数据
        list: [],
        //总共数据多少条
        total: 0,
        //每页多少条数据
        pageSize: 1,
        //当前页码
        pageNumber: 1,
        //添加表单
        addForm: {
          account: '',
          password: '',
          role_id: '',
          mobile: '',
          email: '',
          status: 1,
          real_name: '',
          desc: '',
          avatar_id: '',
          avatar_url: ''
        },
        //验证规则
        ruleValidate: {
          account: [
            {required: true, message: '帐号不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '帐号不能少于2个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          role_id: [
            {required: true, message: '请选择所属角色', trigger: 'change'}
          ],
          real_name: [
            {type: 'string', min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur'}
          ],
          mobile: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          desc: [
            {type: 'string', max: 200, message: '备注说明不能超过200字', trigger: 'blur'}
          ]
        },
        //编辑验证规则
        editRuleValidate: {
          account: [
            {required: true, message: '帐号不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '帐号不能少于2个字符', trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          role_id: [
            {required: true, message: '请选择所属角色', trigger: 'change'}
          ],
          real_name: [
            {type: 'string', min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur'}
          ],
          mobile: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          desc: [
            {type: 'string', max: 200, message: '备注说明不能超过200字', trigger: 'blur'}
          ]
        },
        //搜索表单
        formSearch: {},
        //编辑表单
        editForm: {},
        //添加 modal
        addModal: false,
        //编辑 modal
        editModal: false,
        //上传参数
        uploadAvatarParams: {
          uploadUrl: '', //上传url
          domain: '', //访问域名
          token: '', //授权token
          key: '', //上传目录
          'x:scene': '2' //上传方式
        },
        imgUrl: '',
        visible: false,
        uploadType: 'add',
        defaultAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCN0Q4MzdGNzY3MzExRTY4NkNGQUQ0RTA2MEQxOTUyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCN0Q4MzgwNzY3MzExRTY4NkNGQUQ0RTA2MEQxOTUyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkI3RDgzN0Q3NjczMTFFNjg2Q0ZBRDRFMDYwRDE5NTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkI3RDgzN0U3NjczMTFFNjg2Q0ZBRDRFMDYwRDE5NTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WJZVsAAAfpUlEQVR42uyd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'
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
            this.save('AdminAddUser', this.addForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      //修改数据
      editSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('AdminEditUser', this.editForm);
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
        this.pageNumber = page;
        let search = this.formSearch;
        let query = Object.assign({page: page}, search);
        //分页
        this.$router.push({name: this.$router.currentRoute.name, query: query});
        //获取最新数据
        this.getData({page: page, params: search});
      },
      getData (params) {
        if (!params) params = {page: 1};
        this.request('AdminUser', params, true).then((res) => {
          if (res.status) {
            //列表数据
            this.list = res.data.list;
            //总页数
            this.total = res.data.count;
            //每页多少条数据
            this.pageSize = res.data.size;
            //角色数据
            this.roles = res.data.role;
          }
        });
      },
      edit (index) {
        //打开 modal 窗口
        this.editModal = true;
        //获取原数据
        this.editForm = this.list[index];
      },
      //重置用户密码
      restPassword (id) {
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>你确定要重置密码为[123456]?</p>',
          loading: true,
          onOk: () => {
            this.request('RestPassword', {id: id}).then((res) => {
              if (res.status) {
                this.$Message.success(res.msg);
                this.$Modal.remove();
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
        let page = 1;
        this.pageNumber = page;
        let search = this.formSearch;
        this.getData({params: search});
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
        });
      },
      //头像
      handleView (url) {
        this.imgUrl = url;
        this.visible = true;
      },
      //删除头像
      handleRemove (avatarId, msg, empty = true) {
        if (!parseInt(avatarId)) return false;
        this.request('AdminEmptyAvatar', {uid: this.$store.state.ManageUser.userInfo.uid, avatar_id: avatarId}, '删除中...').then((res) => {
          if (res.status) {
            if (empty) {
              this.editForm.avatar_id = 0;
              this.editForm.avatar_url = '';
            }
            if (msg) {
              this.$Message.success(msg);
            } else {
              this.$Message.success(res.msg);
            }
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 512KB。'
        });
      },
      //上传前前置操作
      handleBeforeUpload (file) {
        this.uploadAvatarParams.key = 'manage/user/avatar/' + Util.currentDate() + '/' + file.name;
        return true;
      },
      //上传成功操作
      handleSuccess (res) {
        if (res.status === false) {
          this.$Message.error('上传失败...');
          return false;
        }
        let avatar = 0;
        if (this.uploadType === 'edit') {
          avatar = parseInt(this.editForm.avatar_id);
          this.editForm.avatar_id = res.data.id;
          this.editForm.avatar_url = this.uploadAvatarParams.domain + this.uploadAvatarParams.key;
        } else {
          avatar = parseInt(this.addForm.avatar_id);
          this.addForm.avatar_id = res.data.id;
          this.addForm.avatar_url = this.uploadAvatarParams.domain + this.uploadAvatarParams.key;
        }
        if (avatar > 0) {
          this.handleRemove(avatar, '替换成功...', false);
        } else {
          this.$Message.success('上传成功...');
        }
      }
    },
    mounted() {
      //服务端获取数据
      this.getData();
      //请求token
      this.request('QiNiuToken', {bucket: 'yc-life-dev', callback: true}).then((res) => {
        if (res.status) {
          this.uploadAvatarParams.token = res.data.token;
          this.uploadAvatarParams.domain = res.data.domain;
          this.uploadAvatarParams.uploadUrl = res.data.uploadUrl;

        } else {
          this.$Message.error('上传初始化失败,请重试!');
        }
      });
    },
    components: {},
    watch: {
      '$route' (to, from) {
      }
    },
    beforeDestroy () {}
  };
</script>
