<template>
  <div>
    <Alert show-icon>
      温馨提示
      <template slot="desc">
        1.如果您未接入有微信公众平台，将会使用我们平台提供的公众号进行活动参与！<br/>
        2.但凡已经开始的活动不能添加与修改奖品信息，请发布的时候认真核对奖品信息，如果实在要修改奖品信息请联系客服人员。<br/>
        3.但凡活动开始字集字以及数量都不能再修改，但可以修改概率。<br/>
        4.如果你想功能更强大的可以升级商户版或者联系客户人员单独开发。
      </template>
    </Alert>
    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="110">
      <Row>
        <Col span="12">
        <Form-item label="活动名称" prop="name">
          <Input v-model="formField.name" placeholder="请输入姓名"></Input>
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
        <Form-item label="活动日期" class="ivu-form-item-required">
          <Row>
            <Col span="11">
            <Form-item prop="start_time">
              <Date-picker type="datetime" placeholder="开始时间" v-model="formField.start_time"></Date-picker>
            </Form-item>
            </Col>
            <Col span="2" style="text-align: center">
            -</Col>
            <Col span="11">
            <Form-item prop="end_time">
              <Date-picker type="datetime" placeholder="开始时间" v-model="formField.end_time"></Date-picker>
            </Form-item>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="是否关注" prop="is_follow">
          <Radio-group v-model="formField.is_follow">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
          <span>温馨提示：强制关注有可能会被封号哟!</span>
        </Form-item>
        <Form-item label="每日重复" prop="is_repeat">
          <Radio-group v-model="formField.is_repeat">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="每天重复次数" prop="re_number">
          <Input v-model="formField.re_number" placeholder="如果为0将不会限制"></Input>
        </Form-item>
        <Form-item label="分享增加机会" prop="is_share_chance">
          <Radio-group v-model="formField.is_share_chance" @on-change="onChangeChance">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="每日增加次数" prop="share_inc_chance" v-show="isChanceShow">
          <Input v-model="formField.share_inc_chance" placeholder="分享增加机会只能是1-9区间的整数"></Input>
        </Form-item>
        <Form-item label="是否登记身份" prop="is_register">
          <Radio-group v-model="formField.is_register">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </Radio-group>
        </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="活动规则" prop="rules">
          <Input v-model="formField.rules" type="textarea" :rows="4" placeholder="详细活动规则介绍,支持HTML标签粘贴!"></Input>
        </Form-item>
        <Form-item label="分享标题" prop="share_title">
          <Input v-model="formField.share_title" placeholder="20字内的分享标题"></Input>
        </Form-item>
        <Form-item label="分享内容" prop="share_content">
          <Input v-model="formField.share_content" type="textarea" :rows="4" placeholder="50字内分享内容"></Input>
        </Form-item>
        <Form-item label="中奖分享标题" prop="in_share_title">
          <Input v-model="formField.in_share_title" placeholder="20字内的中奖分享标题"></Input>
          <p>{{}} 括号至括号内的内容可以不用修改，系统将自动匹配！</p>
        </Form-item>
        <Form-item label="中奖分享描述" prop="in_share_content">
          <Input v-model="formField.in_share_content" type="textarea" :rows="4" placeholder="50字内分享内容"></Input>
          <p>{{}} 括号至括号内的内容可以不用修改，系统将自动匹配！</p>
        </Form-item>
        </Col>
      </Row>
      <Form-item label="活动详情" prop="content">
        <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config" style="line-height: normal"></UEditor>
      </Form-item>
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
          cover: '',
          share_title: '快来帮我收集文字吧，我要召唤神龙!!',
          share_content: '集齐所有文字据说可以召唤出神龙',
          in_share_title: '我正在参加“{{活动名称}}”活动，得到了{{奖品名称}}，太激动啦！',
          in_share_content: '我正在参加“{{活动名称}}”活动，神龙实现了我的愿望， 得到了{{奖品名称}}，太激动啦，您也快来试试吧！',
          is_repeat: '1',
          re_number: '3',
          is_follow: '1',
          is_share_chance: '1',
          share_inc_chance: '1',
          is_register: '1',
          start_time: '',
          end_time: '',
          content: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '活动名称不能为空', trigger: 'blur'},
            {type: 'string', max: 50, message: '活动名称最多50个字符', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请上传活动封面', trigger: 'input'},
            {type: 'string', message: '请上传封面图片', trigger: 'input', pattern: /^[1-9]\d*$/}
          ],
          is_follow: [
            {required: true, message: '请选择是否关注', trigger: 'blur'}
          ],
          is_repeat: [
            {required: true, message: '请选择是否重复玩耍', trigger: 'blur'}
          ],
          re_number: [
            {required: true, message: '重复次数不能为空', trigger: 'blur'},
            {type: 'string', message: '重复次数只能是0-9正整数', trigger: 'blur', pattern: /^[0-9]+$/}
          ],
          rules: [
            {required: true, message: '请填写活动规则', trigger: 'blur'}
          ],
          share_title: [
            {required: true, message: '请填写分享标题', trigger: 'blur'},
            {type: 'string', max: 50, message: '分享标题最多50个字符', trigger: 'blur'}
          ],
          share_content: [
            {required: true, message: '请填写分享内容', trigger: 'blur'},
            {type: 'string', max: 80, message: '分享内容最多50个字符', trigger: 'blur'}
          ],
          in_share_title: [
            {required: true, message: '请填写中奖分享标题', trigger: 'blur'},
            {type: 'string', max: 50, message: '中奖分享标题最多50个字符', trigger: 'blur'}
          ],
          in_share_content: [
            {required: true, message: '请填写中奖分享内容', trigger: 'blur'},
            {type: 'string', max: 80, message: '中奖分享内容最多50个字符', trigger: 'blur'}
          ],
          is_register: [
            {required: true, message: '请选择是否登记中奖信息', trigger: 'blur'}
          ],
          share_inc_chance: [
            {type: 'string', message: '分享增加机会次数只能是1-9区间', trigger: 'blur', pattern: /^[1-9]+$/}
          ],
          content: [
            {required: true, message: '请编写活动内容', trigger: 'blur'}
          ],
          start_time: [
            {required: true, type: 'string', message: '请选择活动开始时间', trigger: 'change'}
          ],
          end_time: [
            {required: true, type: 'string', message: '请选择活动结束时间', trigger: 'change'}
          ]
        }
      }
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
        })
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
    mounted() {
    },
    components: {
      UEditor
    }
  }
</script>
