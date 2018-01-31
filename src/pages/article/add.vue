<template>
  <div>
      <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="80">
      <Row>
        <Col span="12">
          <Form-item label="文章标题" prop="title" style="width: 400px;">
            <Input v-model="formField.title" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="cateId" style="width: 400px;">
            <Select v-model="formField.cateId" placeholder="请选择">
              <Option value="">请选择</Option>
              <div v-for="item in cate" >
                <Option :value="item.id" :key="item.id" v-html="item._name" v-if="item.is_father == 1" disabled></Option>
                <Option :value="item.id" :key="item.id" v-html="item._name" v-else-if="item.is_father == 0"></Option>
              </div>
            </Select>
          </Form-item>
          <Form-item label="文章作者" prop="author" style="width: 400px;">
            <Input v-model="formField.author" placeholder="请填写文章作者"></Input>
          </Form-item>
          <Form-item label="缩略图片" prop="thumbnail" style="width: 400px;">
            <Upload action="//jsonplaceholder.typicode.com/posts/" success="uploadSuccess">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
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
        </Col>
        <Col span="12">
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
        </Col>
      </Row>
      </Form>
  </div>
</template>

<script>
  import UEditor from '@/components/editor';
  export default{
    name: 'articleAdd',
    data () {
      return {
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
            this.request('ArticleAdd', this.formField).then((res) => {
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
      getCate() {
        this.request('ArticleCategoryList', {type: 1}, true).then((res) => {
          if (res.status) {
            this.cate = res.data;
          }
        });
      },
      //初始化编辑器
      editorReady(instance) {
        instance.setContent('');
        instance.addListener('contentChange', () => {
          this.formField.content = instance.getContent();
        });
      },
      //后退海阔天空
      goBack() {
        this.$router.go(-1);
      },
      //上传成功要执行的方法
      uploadSuccess() {
      }
    },
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
      this.getCate();
    },
    beforeUpdate () {},
    updated () {},
    beforeDestroy () {},
    destroyed () {}
  };
</script>
