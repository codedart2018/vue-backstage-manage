<style src="@/assets/styles/activity/index.less" lang="less" scoped></style>
<style src="@/assets/styles/activity/edit.less" lang="less" scoped></style>
<template>
  <div>
    <Tabs value="base" :animated="false">
      <Tab-pane label="基础设置" name="base">
        <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="110">
          <Row>
            <i-col span="10">
              <Form-item label="活动名称" prop="name">
                <Input v-model="formField.name" placeholder="请填写活动名称"/>
              </Form-item>
              <Form-item label="活动副标题" prop="subtitle">
                <Input v-model="formField.subtitle" placeholder="请填写活动副标题"></Input>
              </Form-item>
              <Form-item label="活动关键词" prop="keywords">
                <Input v-model="formField.keywords" placeholder="请填写活动关键词,多个用逗号分隔"/>
              </Form-item>
              <Form-item label="活动分类" prop="categoryId" style="width: 300px;">
                <Select v-model="formField.categoryId" placeholder="请选择">
                  <Option value="">请选择</Option>
                  <div v-for="item in cate">
                    <Option :value="item.id" :key="item.id" v-html="item.name"></Option>
                  </div>
                </Select>
              </Form-item>
              <Form-item label="活动封面" prop="cover">
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
              <FormItem label="参与等级" prop="vipLevel" style="width: 300px;">
                <Select v-model="formField.vipLevel" placeholder="请选择参与等级">
                  <Option value="0">不限等级</Option>
                  <Option value="1">VIP1</Option>
                  <Option value="1">VIP2</Option>
                </Select>
              </FormItem>
              <FormItem label="参与人数" prop="maxPeople" style="width: 300px; position: relative;">
                <Input v-model="formField.maxPeople" placeholder="限制参与人数,填0为不限制"/>
                <span style="position: absolute; top: 0; right: -160px;">开启附加商品后限制将失效</span>
              </FormItem>
              <FormItem label="基础价格" prop="price" style="width: 300px; position: relative;">
                <Input v-model="formField.price" placeholder="销售基础价格"/>
                <span style="position: absolute; top: 0; right: -280px;">开启附加商品后将基础价格加附加价格为销售价格</span>
              </FormItem>
              <Form-item label="活动日期" class="ivu-form-item-required">
                <Row>
                  <i-col span="8">
                    <Form-item prop="startTime">
                      <Date-picker type="datetime" placeholder="开始时间" v-model="formField.startTime" v @on-change="changeStartTime"></Date-picker>
                    </Form-item>
                  </i-col>
                  <i-col span="2" style="text-align: center">
                    至
                  </i-col>
                  <i-col span="8">
                    <Form-item prop="endTime">
                      <Date-picker type="datetime" placeholder="结束时间" v-model="formField.endTime" @on-change="changeEndTime"></Date-picker>
                    </Form-item>
                  </i-col>
                </Row>
              </Form-item>
              <Form-item label="地图坐标：">
                <Button type="info" icon="map" @click="mapModal = true">地图标注</Button>
                <span>（{{formField.longitude}} - {{formField.latitude}}）</span>
              </Form-item>
              <Form-item label="活动地址" prop="formField">
                <Input v-model="formField.address" placeholder="请填写活动线下地址"/>
              </Form-item>
              <Form-item label="活动外接" prop="link">
                <Input v-model="formField.link" placeholder="请填写活动关键词,多个用逗号分隔"/>
              </Form-item>
            </i-col>
            <i-col span="14">
              <Form-item label="附加商品" prop="addedGoods">
                <Radio-group v-model="formField.addedGoods">
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
              <Form-item label="活动简介" prop="remarks">
                <Input v-model="formField.remarks" type="textarea" :rows="4" placeholder="限500字简单说明介绍"/>
              </Form-item>
              <Form-item label="活动详情" prop="content">
                <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config" style="line-height: normal"></UEditor>
              </Form-item>
            </i-col>
          </Row>
          <Row>
            <i-col span="6" push="18" style="text-align: right">
              <Form-item>
                <Button type="primary" @click="handleSubmit('formField')">修改保存</Button>
                <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
              </Form-item>
            </i-col>
          </Row>
        </Form>
      </Tab-pane>
      <Tab-pane label="商品管理" name="goods" v-if="formField.addedGoods === '1'">
        <Row class="mb-15 pb-15" style="border-bottom: 1px dashed #dedede;">
          <i-col span="24">
            <Alert type="warning" show-icon>
              1.最多只能添加5个规格属性,每个规格属性下最多只能添加10个属性!
              <br><br>
              2.修改属性及属性值请先将商品状态进行暂停处理,处理完毕后再进行上架!
              <br><br>
              3.新增一组属性会将原有商品数据删除掉!
              <br><br>
              4.删除规格属性会将所有添加的商品给删除掉!
              <br><br>
              5.新增属性值和修改属性名，属性值将不会对商品造成影响!
            </Alert>
          </i-col>
          <Row>
            <i-col span="10">
              <Row>
                <i-col span="9">
                  <Input v-model="goodsAttributeName" placeholder="请填写属性名称"></Input>
                </i-col>
                <i-col span="1">&nbsp;</i-col>
                <i-col span="9">
                  <Input v-model="goodsAttributeValue" placeholder="请填写属性值,多个属性值请求(半角,逗号分隔)"></Input>
                </i-col>
                <i-col span="1">&nbsp;</i-col>
                <i-col span="4">
                  <Button type="info" @click="handleAddAttribute">添加属性</Button>
                </i-col>
              </Row>
            </i-col>
          </Row>

          <Row v-for="(item, index) in attribute" :key="index" style="margin-top: 15px">
            <i-col span="3">
              属性名：
              <div class="tag-button" @click="editAttributeModal = true; attributeName = item.name; attributeIndex = index">
                <div class="text-box" style="display: flex; flex-direction: row; padding: 0">
                  <div @click.stop="addAttributeModal = true; attributeIndex = index; attributeName = item.name;" style="padding-left: 8px;">
                    <Icon type="plus"></Icon>
                  </div>
                  <div style="padding-right: 8px;">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div class="close-box" @click.stop="deleteAttributeModal = true; attributeIndex = index; attributeName = item.name;">
                  <Icon type="close"></Icon>
                </div>
              </div>
            </i-col>
            <i-col span="21">属性值：
              <div class="tag-button" v-for="(child, key) in item.value" :key="key"
                   @click="editAttributeValueModal = true; attributeValue = child.attributeValue; attributeId = child.id">
                <div class="text-box">
                  <Icon type="compose"></Icon>
                  <span>{{child.attributeValue}}</span>
                </div>
                <div class="close-box"
                     @click.stop="deleteAttributeValueModal = true; attributeIndex = index; attributeValueIndex = key; attributeId = child.id">
                  <Icon type="close"></Icon>
                </div>
              </div>
            </i-col>
          </Row>

          <i-col span="24">
            <table class="table2">
              <thead>
              <tr>
                <td width="100">货品id</td>
                <td v-for="(item, index) in attribute" :key="index">选择{{item.name}}</td>
                <td width="150">附加价格</td>
                <td width="150">库存</td>
                <td width="150">货号</td>
                <td width="90">已售</td>
                <td width="90">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in goodsList" :key="index" v-show="attribute.length > 0">
                <td>{{item.id}}</td>
                <td v-for="(child, key) in item.attrGroup" :key="key">{{child}}</td>
                <td>
                  <InputNumber :min="0" :precision="2" v-model="item.additionalPrice" placeholder="光标移出保存附加价格"
                               @on-change="editGoods($event, item.id, 'additionalPrice')"></InputNumber>
                </td>
                <td>
                  <InputNumber :min="0" v-model="item.inventory" placeholder="光标移出保存库存"
                               @on-change="editGoods($event, item.id, 'inventory')"></InputNumber>
                </td>
                <td>{{item.artNo}}</td>
                <td>{{item.sales}}</td>
                <td>
                  <Button type="warning" @click="deleteGoods(index, item.id)">删除商品</Button>
                </td>
              </tr>
              <tr>
                <td>添加属性</td>
                <td v-for="(item, index) in attribute" :key="index" v-show="attribute.length > 0">
                  <Select style="width:200px" :label-in-value="true" v-model="goodsForm[item.name]" @on-change="handleChangeAttribute($event, index)">
                    <Option v-for="(child, key) in item.value" :value="child.id" :key="key">{{child.attributeValue}}</Option>
                  </Select>
                </td>
                <td>
                  <InputNumber :min="0" :precision="2" v-model="goodsForm.additionalPrice" placeholder="请填写附加价格"></InputNumber>
                </td>
                <td>
                  <InputNumber :min="0" v-model="goodsForm.inventory" placeholder="请填写库存"></InputNumber>
                </td>
                <td>
                  <Input v-model="goodsForm.artNo" placeholder="请填写货号"></Input>
                </td>
                <td>0</td>
                <td width="90">
                  <Button type="primary" @click="saveGoods">保存添加</Button>
                </td>
              </tr>
              </tbody>
            </table>
          </i-col>
        </Row>
      </Tab-pane>
    </Tabs>
    <!--地图标注-->
    <Modal v-model="mapModal" width="700">
      <div slot="header" class="ivu-modal-header-inner">地图标注</div>
      <div id="map-container" class="map" style="width: 100%; height: 400px;"></div>
      <div slot="footer">
        <Button type="ghost" @click="mapModal = false">取消</Button>
        <Button type="primary" @click="mapModal = false">确认</Button>
      </div>
    </Modal>
    <!--查看图片 modal-->
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <!--查看图片 modal 结束-->
    <!--新增商品属性值modal-->
    <Modal v-model="addAttributeModal" width="360">
      <p slot="header">
        <span>属性值名称</span>
      </p>
      <div style="text-align:center">
        <Input v-model="attributeValue" placeholder="请填写要添加的属性名"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click.native="addAttributeModal = false; attributeValue = ''; attributeIndex = -1">取消</Button>
        <Button type="primary" @click.stop="confirmAddAttributeName">确认添加</Button>
      </div>
    </Modal>
    <!--修改商品属性modal-->
    <Modal v-model="editAttributeModal" width="360">
      <p slot="header">
        <span>修改属性名称</span>
      </p>
      <div style="text-align:center">
        <Input v-model="attributeName" placeholder="请填写要修改的属性名"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click.native="editAttributeModal = false; attributeName = ''; attributeIndex = -1">取消</Button>
        <Button type="primary" @click.stop="confirmEditAttributeName">确认修改</Button>
      </div>
    </Modal>
    <!--删除商品属性 modal 提示-->
    <Modal v-model="deleteAttributeModal" width="400">
      <p slot="header" style="color:#f60; text-align:center">
        <Icon type="information-circled"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除此属性,属性一旦删除将清除所有的商品数据!请谨慎!!</p>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" @click="confirmDeleteAttribute" long>确认删除</Button>
      </div>
    </Modal>
    <!--修改商品属性值modal-->
    <Modal v-model="editAttributeValueModal" width="360">
      <p slot="header">
        <span>修改属性名称</span>
      </p>
      <div style="text-align:center">
        <Input v-model="attributeValue" placeholder="请填写要修改的属性名"></Input>
      </div>
      <div slot="footer">
        <Button type="ghost" @click.native="editAttributeValueModal = false; attributeValue = '';">取消</Button>
        <Button type="primary" @click="confirmEditAttributeValue">确认修改</Button>
      </div>
    </Modal>
    <!--删除商品属性值 modal 提示-->
    <Modal v-model="deleteAttributeValueModal" width="400">
      <p slot="header" style="color:#f60; text-align:center">
        <Icon type="information-circled"></Icon>
        <span>温馨提示</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除此属性值,属性值一旦删除相关商品数据也将删除!请谨慎!!</p>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" @click="confirmDeleteAttributeValue" long>确认删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import Util from '@/libs/util';
  import UEditor from '@/components/editor';
  import { createScript, removeScript } from '@/libs/autoLoad';

  let map;

  export default {
    components: {
      UEditor
    },
    data () {
      const validateMaxPeople = (rule, value, callback) => {
        if (value) {
          let reg = /^[0-9]+$/;
          if (!reg.test(value)) {
            callback(new Error('参与人数只能是整数'));
          }
        }
        callback();
      };
      return {
        id: this.$route.params.id,
        AMap: null,
        //地图modal
        mapModal: false,
        //要添加的属性名modal
        addAttributeModal: false,
        //要修改的属性名modal
        editAttributeModal: false,
        //属性名
        attributeName: '',
        //要修改的属性KEY值
        attributeIndex: -1,
        //修改商品属性值modal
        editAttributeValueModal: false,
        //修改商品属性值
        attributeValue: '',
        //要修改的商品属性值下标
        attributeValueIndex: -1,
        //商品属性值ID
        attributeId: 0,
        //删除商品属性值modal
        deleteAttributeModal: false,
        //删除商品属性值modal
        deleteAttributeValueModal: false,
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
        uploadList: [
//          {id: 41, name: 'amn1.jpg', url: 'https://oss.life.dev.yongchuan.cc/manage/activity/cover/2018-01-19/amn1.jpg'},
//          {id: 40, name: 'amn2.jpg', url: 'https://oss.life.dev.yongchuan.cc/manage/activity/cover/2018-01-19/amn2.jpg'}
        ],
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
        isChanceShow: true,
        formField: {
          name: '',
          keywords: '',
          vipLevel: '',
          cover: [],
          coverList: [],
          maxPeople: '0',
          price: 0,
          addedGoods: '0',
          isFollow: '1',
          link: '',
          startTime: '',
          endTime: '',
          remarks: '',
          content: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '活动名称不能为空', trigger: 'blur'},
            {type: 'string', min: 5, message: '活动名称最少5个字符', trigger: 'change'},
            {type: 'string', max: 50, message: '活动名称最多50个字符', trigger: 'blur'}
          ],
          keywords: [
            {required: true, message: '活动关键词不能为空', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: '请选择活动分类', trigger: 'change'}
          ],
          vipLevel: [
            {required: true, message: '请选择参与等级', trigger: 'change'}
          ],
          maxPeople: [
            {required: true, message: '请填写参与人数', trigger: 'blur'},
            {validator: validateMaxPeople, trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请填写参与人数', trigger: 'blur'},
            {type: 'string', message: '价格只能是2位小数的合法数字', trigger: 'blur', pattern: /^(\d|([1-9]\d+))(\.\d{1,2})?$/}
          ],
          cover: [
            {required: true, type: 'array', min: 1, message: '请上传活动封面', trigger: 'change'},
            {type: 'array', max: 5, message: '最多只能上传5张封面', trigger: 'change'}
          ],
          isFollow: [
            {required: true, message: '请选择是否关注', trigger: 'blur'}
          ],
          link: [
            {type: 'url', message: '外链地址不正确', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请编写活动内容', trigger: 'blur'}
          ],
          startTime: [
            {required: true, type: 'date', message: '请选择活动开始时间', trigger: 'change'}
          ],
          endTime: [
            {required: true, type: 'date', message: '请选择活动结束时间', trigger: 'change'}
          ]
        },
        //提交状态
        subStart: true,
        //商品属性名称
        goodsAttributeName: '',
        //商品属性类型
        goodsAttributeValue: '',
        //商品属性数组
        attribute: [
          // {
          //   name: '颜色',
          //   type: 'color'
          // }
        ],
        //商品表单
        goodsForm: {
          attrIds: [],
          attrGroup: [],
          inventory: 10,
          additionalPrice: 0,
          artNo: ''
        },
        //商品数据
        goodsList: [
          /**{id: '20', attrGroup: ['3人餐', '中午', '晚上'], inventory: 10, additionalPrice: 0, artNo: '5454545'}**/
        ],
        //分类数据
        cate: []
      };
    },
    methods: {
      initMap () {
        let AMap = this.AMap = window.AMap;
        map = new AMap.Map('map-container', {
          resizeEnable: window.globalVar.GMap.resizeEnable,
          zoom: window.globalVar.GMap.zoom,
          center: window.globalVar.GMap.center
        });
        // 启用工具条
        AMap.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar({
            position: 'RB'
          }));
        });
        //地图点击事件
        map.on('click', (e) => {
          //清除地图覆盖物
          map.clearMap();
          //添加点标记，并使用自己的icon
          /* eslint-disable no-new */
          new AMap.Marker({
            map: map,
            position: [e.lnglat.getLng(), e.lnglat.getLat()],
            icon: new AMap.Icon({
              size: new AMap.Size(32, 32),  //图标大小
              image: '/static/images/mark.png',
              imageOffset: new AMap.Pixel(0, 0)
            })
          });
          this.formField.longitude = e.lnglat.getLng();
          this.formField.latitude = e.lnglat.getLat();
        });
      },
      //获取数据 并初始化编辑器
      editorReady (instance) {
        let id = this.$route.params.id;
        document.body.ondrop = function (event) {
          event.preventDefault();
          event.stopPropagation();
        };
        this.request('ActivityDetail', {id: id}).then((res) => {
          if (res.status) {
            const data = res.data;
            this.formField = data;
            this.formField.content = data.content;
            this.formField.coverList = data.coverList;
            this.uploadList = data.coverList;
            //处理商品数据
            this.attribute = data.attribute;
            this.goodsList = data.goodsList;
            //重新处理日期 必须处理不然会报错 todo 重置日期有导致活动封面不能正常加载 除非把uploadList 移到下面来，现在取消日期重置看是否报错
            //this.formField.startTime = new Date(data.startTime);
            //this.formField.endTime = new Date(data.endTime);
            instance.execCommand('insertHtml', res.data.content);
            instance.addListener('contentChange', () => {
              this.formField.content = instance.getContent();
              this.$refs.formField.validateField('content');
            });
            this.$forceUpdate();
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      //获得分类数据
      getCate () {
        this.request('ActivityCategory', {}).then((res) => {
          if (res.status) {
            this.cate = res.data.list;
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
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            return false;
          } else {
            if (!this.subStart) {
              this.$Message.error('请勿提交过快!!!');
              return false;
            }
            this.subStart = false;
            //let params = Object.assign({tabs: 'base'}, this.formField);
            this.request('ActivityEdit', this.formField).then((res) => {
              if (res.status) {
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
              }
            });
            setTimeout(() => { this.subStart = true; }, 5000);
          }
        });
      },
      //重置表单
      handleReset (name) {
        this.$refs[name].resetFields();
        this.coverList = [];
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
        this.uploadCoverParams.key = 'manage/activity/cover/' + Util.currentDate() + '/' + file.name;
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
      //设置开始时间
      changeStartTime (v) {
        let startStamp = Util.getTimestamp(v);
        let endStamp = Util.getTimestamp(this.formField.endTime);
        if (endStamp && (startStamp > endStamp)) {
          this.$Message.error('活动结束时间不能大于开始时间');
          return false;
        }
      },
      //设置结束时间
      changeEndTime (v) {
        let startStamp = Util.getTimestamp(this.formField.startTime);
        let endStamp = Util.getTimestamp(v);
        if (!this.formField.startTime) {
          this.$Message.error('请选择活动开始时间');
          return false;
        }
        if (startStamp > endStamp) {
          this.$Message.error('活动结束时间不能大于开始时间');
          return false;
        }
      },
      //添加规格属性
      handleAddAttribute () {
        if (!this.goodsAttributeName) {
          this.$Message.error('请先填写属性名称');
          return;
        }
        if (this.$strLen(this.goodsAttributeName) > 20) {
          this.$Message.error('属性最多20个字符');
          return false;
        }
        if (!this.goodsAttributeValue) {
          this.$Message.error('请填写属性值');
          return false;
        }
        if (this.attribute.length > 5) {
          this.$Message.error('最多只能添加5组属性');
          return false;
        }
        let tempStatus = false;
        //检查是否有相同的属性
        this.attribute.map((item) => {
          if (item.name === this.goodsAttributeName) {
            tempStatus = true;
          }
        });
        if (tempStatus) {
          this.$Message.error('已经存在相同的属性名了');
          return false;
        }
        //往后台发送数据
        let data = {
          tabs: 'addAttributeValue',
          id: this.id,
          attributeName: this.goodsAttributeName,
          attributeValue: this.goodsAttributeValue
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute.push(res.data);
            this.goodsAttributeName = '';
            this.goodsAttributeValue = '';
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      //select值变化时
      handleChangeAttribute (value, index) {
        this.goodsForm.attrIds[index] = value.value;
        this.goodsForm.attrGroup[index] = value.label;
      },
      //保存Goods表单
      saveGoods: function () {
        let check = true;
        let msgTip = '';
        //检查有多少个属性
        this.attribute.map((item) => {
          if (typeof (this.goodsForm[item.name]) === 'undefined') {
            check = false;
            msgTip = item.name;
            return false;
          }
        });
        if (!check) {
          this.$Message.error('请选择' + msgTip + '属性');
          return false;
        }
        //检查是否填写库存
        if (!this.goodsForm.inventory) {
          this.$Message.error('库存不能为0');
          return false;
        }
        //检查是否填写货号
        // if (!this.goodsForm.artNo) {
        //   this.$Message.error('请填写货号');
        //   return false;
        // }
        //往后台提交数据 并且判断数据是否有添加过
        let data = {
          tabs: 'goodsAdd',
          id: this.id,
          attr: this.goodsForm.attrIds,
          attrValue: this.goodsForm.attrGroup,
          inventory: this.goodsForm.inventory,
          additionalPrice: this.goodsForm.additionalPrice,
          artNo: this.goodsForm.artNo
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            //克隆数据防止 双向绑定 影响界面
            let clone = Util.cloneObj(this.goodsForm);
            //往列表里推数据
            let goods = {
              id: 1,
              attr: clone.attrIds,
              attrGroup: clone.attrGroup,
              inventory: clone.inventory,
              additionalPrice: clone.additionalPrice,
              artNo: clone.artNo
            };
            this.goodsList.push(goods);
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      //删除商品
      deleteGoods (index, goodsId) {
        let data = {
          tabs: 'goodsDelete',
          id: this.id,
          goodsId: goodsId
        };
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>你确定要删除?删除后不可恢复!</p>',
          loading: true,
          onOk: () => {
            this.request('ActivityEdit', data).then((res) => {
              if (res.status) {
                this.$Message.success(res.msg);
                this.goodsList.splice(index, 1);
                this.$Modal.remove();
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        });
      },
      //修改商品
      editGoods (value, id, type) {
        let data = {
          id: this.id,
          goodsId: id,
          tabs: 'goodsEdit',
          type: type,
          value: value
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      //确认修改属性名
      confirmAddAttributeName () {
        if (!this.attributeValue) {
          this.$Message.error('请填写要添加的属性值');
          return false;
        }
        if (this.$strLen(this.attributeValue) > 20) {
          this.$Message.error('属性最多20个字符');
          return false;
        }
        let data = {
          tabs: 'addAttributeValue',
          id: this.id,
          attributeValue: this.attributeValue,
          attributeName: this.attributeName
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute[this.attributeIndex].value.push({
              attributeName: this.attributeName,
              attributeValue: this.attributeValue,
              id: res.data.id
            });
          } else {
            this.$Message.error(res.msg);
          }
          this.addAttributeModal = false;
          this.attributeValue = '';
          this.attributeIndex = -1;
        });
      },
      //确认修改属性名
      confirmEditAttributeName () {
        if (!this.attributeName) {
          this.$Message.error('请填写要修改的属性名');
          return false;
        }
        if (this.$strLen(this.attributeName) > 20) {
          this.$Message.error('属性最多20个字符');
          return false;
        }
        let data = {
          tabs: 'editAttributeName',
          id: this.id,
          attributeName: this.attributeName,
          oldAttributeName: this.attribute[this.attributeIndex].name
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute[this.attributeIndex].name = this.attributeName;
          } else {
            this.$Message.error(res.msg);
          }
          this.editAttributeModal = false;
          this.attributeName = '';
          this.attributeIndex = -1;
        });
      },
      //确认修改属性值
      confirmEditAttributeValue () {
        if (!this.attributeValue) {
          this.$Message.error('请填写要修改的属性值');
          return false;
        }
        if (this.$strLen(this.attributeValue) > 20) {
          this.$Message.error('属性值最多20个字符');
          return false;
        }
        let data = {
          tabs: 'editAttributeValue',
          id: this.id,
          attributeValue: this.attributeValue,
          attrId: this.attributeId
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute[this.attributeIndex].value[this.attributeValueIndex].attributeValue = this.attributeValue;
          } else {
            this.$Message.error(res.msg);
          }
          this.editAttributeValueModal = false;
          this.attributeValue = '';
          this.attributeValueIndex = -1;
        });
      },
      //移除属性
      confirmDeleteAttribute () {
        if (this.attributeIndex < 0) {
          this.$Message.error('请检查要删除的属性');
          this.deleteAttributeModal = false;
          return false;
        }
        //发起网络请求删除
        let data = {
          tabs: 'deleteAttributeName',
          id: this.id,
          attributeName: this.attributeName
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute.splice(this.attributeIndex, 1);
            //重新接取数据
            this.getGoodsData();
          } else {
            this.$Message.error(res.msg);
          }
        });
        this.deleteAttributeModal = false;
      },
      //移除属性值
      confirmDeleteAttributeValue () {
        if (this.attributeIndex < 0 || !this.attributeId) {
          this.$Message.error('请检查要删除的属性值');
          this.deleteAttributeValueModal = false;
          return false;
        }
        //发起网络请求删除
        let data = {
          tabs: 'deleteAttributeValue',
          id: this.id,
          attrId: this.attributeId
        };
        this.request('ActivityEdit', data).then((res) => {
          if (res.status) {
            this.$Message.success(res.msg);
            this.attribute[this.attributeIndex].value.splice(this.attributeValueIndex, 1);
            //判断检测属性是否还有值
            if (this.attribute[this.attributeIndex].value.length === 0) {
              this.attribute.splice(this.attributeIndex, 1);
            }
            //重新接取数据
            this.getGoodsData();
          } else {
            this.$Message.error(res.msg);
          }
        });
        this.deleteAttributeValueModal = false;
      },
      //取消关闭modal
      cancel () {
        this.editAttributeModal = false;
      },
      getGoodsData () {
        this.request('ActivityGoods', {aid: this.id}).then((res) => {
          if (res.status) {
            this.goodsList = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    beforeCreate () {
      let id = this.$route.params.id;
      if (!id) {
        this.$Message.info('参数ID不存在');
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      }
    },
    created () {
      let url = `https://webapi.amap.com/maps?v=1.3&key=${window.globalVar.GMap.key}`;
      let t = this;
      createScript(url, 'mapDom').then(function () {
        setTimeout(() => {
          t.initMap();
        }, 500);
      }).catch((error) => {
        this.$Message.error('高德地图载入失败,请刷新重试');
        console.log('发生错误！', error);
      });
    },
    beforeMount () {},
    mounted () {
      //获得分类数据
      this.getCate();
      //请求七牛token
      this.initQiNiuToken();
      //this.uploadList = this.$refs.upload.fileList;
    },
    beforeUpdate () {},
    updated () {
    },
    beforeDestroy () {},
    destroyed () {
      removeScript('mapDom');
    }
  };
</script>
