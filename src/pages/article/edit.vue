<template>
  <div>
    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="80">
      <Row>
        <i-col span="12">
          <Form-item label="文章标题" prop="title" style="width: 400px;">
            <Input v-model="formField.title" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="cateId" style="width: 400px;">
            <Select v-model="formField.cateId" placeholder="请选择">
              <Option value="">请选择</Option>
              <div v-for="item in cate">
                <Option :value="item.id" :key="item.id" v-html="item._name" v-if="item.is_father == 1" disabled></Option>
                <Option :value="item.id" :key="item.id" v-html="item._name" v-else-if="item.is_father == 0"></Option>
              </div>
            </Select>
          </Form-item>
          <Form-item label="文章作者" prop="author" style="width: 400px;">
            <Input v-model="formField.author" placeholder="请填写文章作者"></Input>
          </Form-item>
          <Form-item label="缩略图片" prop="cover">
            <div class="upload-mini-box">
              <div v-if="uploadList.length > 0" style="margin-right: 8px;">
                <div class="upload-cover-list" v-for="(item, index) in uploadList" :key="index">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url + '?imageView2/1/w/64/h/64'">
                    <div class="list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
              </div>
              <div class="upload-button">
                <Upload
                  ref="upload"
                  name="file"
                  :show-upload-list="showUploadList"
                  :default-file-list="formField.coverList"
                  :action="action"
                  :data="uploadCoverParams"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                  :on-exceeded-size="handleMaxSize"
                  :max-size="1024"
                  :format="['jpg','jpeg','png']"
                  :on-remove="handleRemove"
                  :on-preview="handleView">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <p class="tips">推荐尺寸：640*280,大小在1M内</p>
              </div>
            </div>
          </Form-item>
          <Form-item label="外链地址" prop="link" style="width: 400px;">
            <Input v-model="formField.link" placeholder="请填写外链地址,填写外链后将跳转到第三方去"></Input>
          </Form-item>
          <Form-item label="原文链接" prop="sourceUrl" style="width: 400px;">
            <Input v-model="formField.sourceUrl" placeholder="请填写原文链接"></Input>
          </Form-item>
          <Form-item label="文章排序" prop="sort" style="width: 400px;">
            <Input v-model="formField.sort" placeholder="排序只能是数字"></Input>
          </Form-item>
          <Form-item label="文章状态" prop="status">
            <Radio-group v-model="formField.status">
              <Radio label="1">正常</Radio>
              <Radio label="0">删除</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="是否留言" prop="openComment">
            <Radio-group v-model="formField.openComment">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="审核留言" prop="isReview">
            <Radio-group v-model="formField.isReview">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </Radio-group>
          </Form-item>
        </i-col>
        <i-col span="12">
          <Form-item label="文章内容" prop="content">
            <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config" style="line-height: normal"></UEditor>
          </Form-item>
          <Form-item>
            <Form-item>
              <Button type="ghost" @click="goBack">返回</Button>
              <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
              <Button type="primary" @click="handleSubmit('formField')" style="margin-left: 8px">提交</Button>
            </Form-item>
          </Form-item>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
  import UEditor from '@/components/editor';
  import Util from '@/libs/util';

  export default {
    name: 'articleAdd',
    data () {
      return {
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
        //编辑器配置
        config: {
          actionUrl: '',
          initialFrameWidth: null,
          initialFrameHeight: 400,
          toolbars: [['undo', 'redo', 'bold', 'italic', 'forecolor', 'backcolor', 'paragraph', 'fontfamily', 'fontsize', 'autotypeset', 'insertorderedlist', 'lineheight', 'inserttable', 'removeformat', 'insertvideo', 'link', 'insertimage', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'indent', 'source']],
          zIndex: 0, // 编辑器层级
          charset: 'utf-8', //编码
          autoHeightEnabled: false
        },
        //分类数据
        cate: [],
        //表单字段
        formField: {
          title: '',
          author: '',
          cateId: '',
          cover: [],
          coverList: [],
          link: '',
          sourceUrl: '',
          thumbnail: '',
          status: '1',
          content: '',
          openComment: '1',
          isReview: '1'
        },
        //验证规则
        ruleValidate: {
          title: [
            {required: true, message: '文章标题不能为空', trigger: 'blur'},
            {type: 'string', min: 2, message: '文章名称不能少于2个字符', trigger: 'blur'},
            {type: 'string', max: 50, message: '文章名称不能大于50个字符', trigger: 'blur'}
          ],
          link: [
            {type: 'url', message: '外链地址不正确', trigger: 'blur'}
          ],
          sourceUrl: [
            {type: 'url', message: '原文链接地址不正确', trigger: 'blur'}
          ],
          cateId: [
            {required: true, message: '请选择文章分类', trigger: 'change'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请编写文章内容', trigger: 'change'}
          ],
          sort: [
            {type: 'string', message: '排序只能数字', trigger: 'blur', pattern: /^[0-9]+$/}
          ]
        }
      };
    },
    components: {
      UEditor
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.request('ArticleEdit', this.formField).then((res) => {
              if (res.status) {
                this.$Message.success(res.msg);
                this.$router.go(-1);
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      //获得分类数据
      getCate () {
        this.request('ArticleCategoryList', {type: 1}, true).then((res) => {
          if (res.status) {
            this.cate = res.data;
          }
        });
      },
      //初始化编辑器
      editorReady (instance) {
        let id = this.$route.params.id;
        this.apiGet('/admin/article/edit', {id: id}).then((res) => {
          this.formField = res.data;
          this.formField.coverList = res.data.coverList;
          //特殊处理图片
          this.uploadList = res.data.coverList.map(item => {
            item.status = 'finished';
            item.percentage = 100;
            item.uid = Date.now() + this.tempIndex++;
            return item;
          });
          instance.execCommand('insertHtml', res.data.content);
          instance.addListener('contentChange', () => {
            this.formField.content = instance.getContent();
            this.$refs.formField.validateField('content');
          });
          this.$forceUpdate();
        });
      },
      //后退海阔天空
      goBack () {
        this.$router.go(-1);
      },
      //上传格式化
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 1M。'
        });
      },
      //上传前前置操作
      handleBeforeUpload (file) {
        if (!this.action) {
          this.$Message.error('上传地址初始化失败');
          return false;
        }
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '封面最多上传5张图片'
          });
        }
        //不能加/斜杠的
        this.uploadCoverParams.key = 'manage/article/cover/' + Util.currentDate() + '/' + file.name;
        return check;
      },
      //上传成功回调
      uploadSuccess (res, file) {
        if (res.status === false) {
          this.$Message.error('上传失败');
          return false;
        }
        file.id = res.data.id;
        file.url = res.data.url;
        file.name = res.data.name;
        //推入数据到cover数组
        this.formField.cover.push(res.data.id);
        //重新验证一次表单
        this.$refs.formField.validateField('cover');
      },
      uploadError () {
        this.$Message.error('上传失败,请重新上传');
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
      //查看封面图片
      handleView (url) {
        this.imgName = url;
        this.visible = true;
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
    beforeCreate () {},
    mounted () {
      this.getCate();
      this.initQiNiuToken();
    }
  };
</script>
