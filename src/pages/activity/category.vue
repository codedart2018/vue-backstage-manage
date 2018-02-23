<template>
  <div>
    <Row>
      <i-col span="18" class="search">
        <Form :model="formSearch" :label-width="80" inline label-position="right">
          <Form-item label="分类名称：">
            <Input v-model="formSearch.keywords" placeholder="请输入分类名称关键词"></Input>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
          </Form-item>
        </Form>
        &nbsp;
      </i-col>
      <i-col span="6" class="text-align-right">
        <Button type="primary" @click="addModal = true; uploadList = []">
          <Icon type="plus-round"></Icon>&nbsp;添加分类
        </Button>
      </i-col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end"></Row>
    <!--添加 Modal 对话框-->
    <Modal v-model="addModal" title="添加分类" class-name="customize-modal-center" @on-cancel="modalCancel()">
      <div>
        <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
          <FormItem label="分类名称" prop="name">
            <Input v-model="addForm.name" placeholder="请填写分类名称"></Input>
          </FormItem>
          <FormItem label="分类图标" prop="icon">
            <div class="upload-mini-box">
              <div v-if="uploadList.length > 0" style="margin-right: 8px;">
                <div class="upload-cover-list" v-for="item in uploadList">
                  <img :src="item.url">
                  <div class="list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
              </div>
              <div class="upload-button">
                <Upload
                  ref="upload"
                  name="file"
                  :show-upload-list="showUploadList"
                  :default-file-list="iconList"
                  :action="action"
                  :data="uploadCoverParams"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                  :on-exceeded-size="handleMaxSize"
                  :max-size="512"
                  :format="['jpg','jpeg','png']"
                  :on-remove="handleRemove"
                  :on-preview="handleView">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传图标</Button>
                </Upload>
              </div>
            </div>
          </FormItem>
          <FormItem label="分类排序" prop="sort">
            <Input v-model="addForm.sort" placeholder="数字越大排序越前"></Input>
          </FormItem>
          <FormItem label="分类状态" prop="status">
            <Radio-group v-model="addForm.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">锁定</Radio>
            </Radio-group>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addSubmit('addForm')">提交</Button>
        <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>
    <!--编辑 Modal 对话框-->
    <Modal v-model="editModal" class-name="customize-modal-center">
      <div slot="header" class="ivu-modal-header-inner">编辑分类</div>
      <div>
        <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
          <Form-item label="分类名称" prop="name">
            <Input v-model="editForm.name" placeholder="请填写分类名称"></Input>
          </Form-item>
          <FormItem label="分类图标" prop="icon">
            <div class="upload-mini-box">
              <div v-if="uploadList.length > 0" style="margin-right: 8px;">
                <div class="upload-cover-list" v-for="item in uploadList">
                  <img :src="item.url">
                  <div class="list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
              </div>
              <div class="upload-button">
                <Upload
                  ref="uploadEdit"
                  name="file"
                  :show-upload-list="showUploadList"
                  :default-file-list="iconList"
                  :action="action"
                  :data="uploadCoverParams"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                  :on-exceeded-size="handleMaxSize"
                  :max-size="512"
                  :format="['jpg','jpeg','png']"
                  :on-remove="handleRemove"
                  :on-preview="handleView">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传图标</Button>
                </Upload>
              </div>
            </div>
          </FormItem>
          <Form-item label="分类排序" prop="sort">
            <Input v-model="editForm.sort" placeholder="数字越大排序越前"></Input>
          </Form-item>
          <Form-item label="分类状态" prop="status">
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

<script>
  import Util from '@/libs/util';

  export default {
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 100
          },
          {
            title: '分类名称',
            render: (h, params) => {
              const row = params.row;
              if (row._name) {
                if (row.pid === '0') {
                  return h('h5', row._name);
                }
                return h('span', row._name);
              }
              return h('span', row.name);
            }
          },
          {
            title: '状态',
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
            title: '添加时间',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$formatDate(params.row.createTime, 'yyyy-MM-dd h:m'));
            }
          },
          {
            title: '更新时间',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$formatDate(params.row.updateTime, 'yyyy-MM-dd h:m'));
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
                      this.remove(params.index, params.row.id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        //列表数据
        list: [],
        addForm: {
          name: '',
          icon: '',
          status: 1,
          sort: ''
        },
        //编辑表单
        editForm: {
          name: '',
          icon: '',
          status: 1,
          sort: ''
        },
        //验证规则
        ruleValidate: {
          name: [
            {required: true, message: '分类名称不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '分类名称不能少于2个字符', trigger: 'blur'}
          ],
          icon: [
            {required: true, type: 'string', message: '请上传分类图标', trigger: 'change'}
          ],
          sort: [
            {type: 'string', message: '排序只能数字', trigger: 'blur', pattern: /^[0-9]+$/}
          ]
        },
        //搜索表单
        formSearch: {},
        //添加 modal
        addModal: false,
        //编辑 modal
        editModal: false,
        //查看图片
        visible: false,
        //查看图片用的 图片名称
        imgName: '',
        //上传Url
        action: '',
        //上传参数
        uploadCoverParams: {
          domain: '', //访问域名
          token: '', //授权token
          key: '', //上传目录
          'x:scene': '2' //上传方式
        },
        //是否显示已上传文件列表
        showUploadList: false,
        uploadList: [],
        //默认列表
        iconList: []
      };
    },
    components: {},
    methods: {
      //取消 modal
      modalCancel () {
        this.editModal = false;
      },
      //重置表单数据
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      //获取数据
      getData (params) {
        if (!params) params = {};
        this.request('ActivityCategory', params, true).then((res) => {
          if (res.status) {
            //列表数据
            this.list = res.data.list;
          } else {
            //列表数据
            this.list = [];
          }
        });
      },
      //添加数据
      addSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('ActivityCategoryAdd', this.addForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      //修改数据
      editSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save('ActivityCategoryEdit', this.editForm);
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      edit (index) {
        //打开 modal 窗口
        this.editModal = true;
        //获取原数据
        this.editForm = this.list[index];
        this.iconList = this.list[index].iconList;
        this.uploadList = this.list[index].iconList.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;
          return item;
        });
        this.$forceUpdate();
      },
      //删除分类数据
      remove (index, id) {
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>你确定要删除?删除后不可恢复!</p>',
          loading: true,
          onOk: () => {
            this.request('ActivityCategoryDelete', {id: id}).then((res) => {
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
      search () {
        let search = this.formSearch;
        this.getData({params: search});
      },
      //保存数据方法
      save (url, data) {
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
      //上传前前置操作
      handleBeforeUpload (file) {
        this.$loading('上传中...');
        //不能加/斜杠的
        this.uploadCoverParams.key = 'manage/activity/category/' + Util.currentDate() + '/' + file.name;
        return true;
      },
      handleFormatError (file) {
        this.$loading.close();
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$loading.close();
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 512KB。'
        });
      },
      //上传成功回调
      uploadSuccess (res, file, fileList) {
        if (res.status === false) {
          this.$Message.error('上传失败');
          return false;
        }
        file.id = res.data.id;
        file.url = res.data.url;
        file.name = res.data.name;
        //判断是否有有数组 有的话移除掉第一个
        if (fileList.length > 1) {
          fileList.shift();
        }
        this.uploadList = fileList.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;
          return item;
        });
        this.addForm.icon = res.data.id;
        this.editForm.icon = res.data.id;
        //重新验证一次表单
        this.$refs.addForm.validateField('icon');
        this.$refs.editForm.validateField('icon');
        this.$loading.close();
        this.$forceUpdate();
      },
      uploadError () {
        this.$loading.close();
        this.$Message.error('上传失败,请重新上传');
      },
      //查看封面图片
      handleView (url) {
        this.imgName = url;
        this.visible = true;
      },
      //文件列表移除文件时的钩子
      handleRemove (file) {
        if (typeof file.response !== 'undefined') {
          const id = file.response.data.id;
          this.removeAttachment(id);
        }
      },
      //移除活动封面
      removeAttachment (id, msg = '') {
        this.request('CommonRemoveAttachment', {id: id}, '保存中...').then((res) => {
          if (res.status) {
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
      //请求七牛token
      initQiNiuToken () {
        this.request('QiNiuToken', {callback: true}).then((res) => {
          if (res.status) {
            this.uploadCoverParams.token = res.data.token;
            this.uploadCoverParams.domain = res.data.domain;
            this.action = res.data.action;
          } else {
            this.$Message.error('上传初始化失败,请重试!');
          }
        });
      }
    },
    mounted () {
      this.initQiNiuToken();
      //服务端获取数据
      this.getData();
    }
  };
</script>
