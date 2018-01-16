<template>
  <div>
    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="110">
      <Row>
        <Col span="10">
        <Form-item label="活动名称" prop="name">
          <Input v-model="formField.name" placeholder="请填写活动名称"></Input>
        </Form-item>
        <Form-item label="活动关键词" prop="keywords">
          <Input v-model="formField.keywords" placeholder="请填写活动关键词,多个用逗号分隔"></Input>
        </Form-item>
        <Form-item label="活动封面" prop="cover">
          <Upload ref="upload"
                  action="/common/upload/ali_oss"
                  :data="upload"
                  :on-success="uploadSuccess"
                  :max-size="1024"
                  :format="['jpg','jpeg','png']"
                  :on-remove="removeCover"
                  :on-preview="coverPreview">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            <span>推荐尺寸：640*280,大小在1M内</span>
          </Upload>
        </Form-item>
        <FormItem label="活动类型" prop="type" style="width: 300px;">
          <Select v-model="formField.type" placeholder="请选择活动类型">
            <Option value="1">报名活动</Option>
          </Select>
        </FormItem>
        <FormItem label="参与等级" prop="vipLevel" style="width: 300px;">
          <Select v-model="formField.vipLevel" placeholder="请选择参与等级">
            <Option value="1">报名活动</Option>
          </Select>
        </FormItem>
        <FormItem label="参与人数" prop="maxPeople" style="width: 300px;">
          <Input v-model="formField.maxPeople" placeholder="限制参与人数,填0为不限制"></Input>
        </FormItem>
        <Form-item label="活动日期" class="ivu-form-item-required">
          <Row>
            <Col span="8">
            <Form-item prop="startTime">
              <Date-picker type="datetime" placeholder="开始时间" v-model="formField.startTime"></Date-picker>
            </Form-item>
            </Col>
            <Col span="2" style="text-align: center">至</Col>
            <Col span="8">
            <Form-item prop="endTime">
              <Date-picker type="datetime" placeholder="开始时间" v-model="formField.endTime"></Date-picker>
            </Form-item>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="活动外接" prop="link">
          <Input v-model="formField.link" placeholder="请填写活动关键词,多个用逗号分隔"></Input>
        </Form-item>
        <Form-item label="是否销售" prop="openSales">
          <Radio-group v-model="formField.openSales">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="是否关注" prop="isFollow">
          <Radio-group v-model="formField.isFollow">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
          <span>温馨提示：强制关注有可能会被封号哟!</span>
        </Form-item>
        <Form-item label="是否登记身份" prop="is_register">
          <Radio-group v-model="formField.is_register">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
        </Form-item>
        </Col>
        <Col span="14">
        <Form-item label="活动简介" prop="desc">
          <Input v-model="formField.desc" type="textarea" :rows="4" placeholder="限500字简单说明介绍"></Input>
        </Form-item>
        <Form-item label="活动详情" prop="content">
          <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config" style="line-height: normal"></UEditor>
        </Form-item>
        </Col>
      </Row>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formField')">保存进入下一步</Button>
        <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
      </Form-item>
    </Form>

    <!--查看图片 modal-->
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <!--查看图片 modal 结束-->
  </div>
</template>

<script>
  import UEditor from '@/components/editor';
  export default{
    data() {
      return {
        //查看图片
        visible: false,
        //查看图片用的 图片名称
        imgName: '',
        //上传配置
        upload: {
          mch_id: 1,
          platform_id: 600000,
          //上传库
          bucket: 'daimatu',
          //目录
          folder: '800000/event/images/'
        },
        //编辑器配置
        config: {
          actionUrl: '&server=daimatu&mch_id=1&platform_id=600000',
          initialFrameWidth: null,
          initialFrameHeight: 300,
          toolbars: [['undo', 'redo', 'bold', 'italic', 'forecolor', 'backcolor', 'paragraph', 'fontfamily', 'fontsize', 'autotypeset', 'insertorderedlist', 'lineheight', 'inserttable', 'removeformat', 'insertvideo', 'link', 'insertimage', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'indent', 'source']],
          zIndex: 0, // 编辑器层级
          charset: 'utf-8', //编码
          autoHeightEnabled: false
        },
        isChanceShow: true,
        formField: {
          name: '',
          keywords: '',
          type: '',
          cover: '',
          maxPeople: 0,
          openSales: '1',
          isFollow: '1',
          is_share_chance: '1',
          is_register: '1',
          startTime: '',
          endTime: '',
          content: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '活动名称不能为空', trigger: 'blur'},
            {type: 'string', max: 50, message: '活动名称最多50个字符', trigger: 'blur'}
          ],
          keywords: [
            {required: true, message: '活动关键词不能为空', trigger: 'blur'}
          ],
          type: [
            { required: true, message: '请选择活动类型', trigger: 'change' }
          ],
          cover: [
            {required: true, message: '请上传活动封面', trigger: 'input'},
            {type: 'string', message: '请上传封面图片', trigger: 'input', pattern: /^[1-9]\d*$/}
          ],
          isFollow: [
            {required: true, message: '请选择是否关注', trigger: 'blur'}
          ],
          is_register: [
            {required: true, message: '请选择是否登记中奖信息', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请编写活动内容', trigger: 'blur'}
          ],
          startTime: [
            {required: true, type: 'string', message: '请选择活动开始时间', trigger: 'change'}
          ],
          endTime: [
            {required: true, type: 'string', message: '请选择活动结束时间', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            return false;
          } else {
            this.request('JiziAdd', this.formField).then((res) => {
              if (res.status) {
                this.$Message.success(res.msg);
                this.$router.push({path: '/event/jizi/edit/' + res.data.id});
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      //点击切换是否增加机会
      onChangeChance(v) {
        if (v === '0') {
          this.isChanceShow = false;
        } else {
          this.isChanceShow = true;
        }
      },
      //上传成功回调
      uploadSuccess(res, file, list) {
        if (res.status === false) {
          list.pop();
          this.$Message.error('上传失败');
          return false;
        }
        //判断原来是否有 如果有删除掉
        if (typeof (list) !== 'undefined' && list.length > 1) {
          const id = list[0].id;
          this.removeAttachment(id, '替换成功');
          list.shift();
          this.formField.cover = '';
        }
        this.formField.cover = res.data.id;
        file.id = res.data.id;
        file.url = res.data.url;
        file.name = res.data.name;
        //重新验证一次表单
        this.$refs.formField.validateField('cover');
      },
      //文件列表移除文件时的钩子
      removeCover(file) {
        if (typeof file.response !== 'undefined') {
          const id = file.response.data.id;
          this.removeAttachment(id);
        }
      },
      //移除活动封面
      removeAttachment(id, msg = '') {
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
      coverPreview(file) {
        this.imgName = file.url;
        this.visible = true;
      },
      //初始化编辑器
      editorReady(instance) {
        instance.setContent('');
        instance.addListener('contentChange', () => {
          this.formField.content = instance.getContent();
          this.$refs.formField.validateField('content');
        });
      }
    },
    beforeCreate () {
    },
    mounted() {
    },
    components: {
      UEditor
    }
  };
</script>
