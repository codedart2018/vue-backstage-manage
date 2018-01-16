<style src="@/assets/styles/shop/detail.less" lang="less" scoped></style>
<template>
  <div>
    <Card dis-hover class="shop-container">
      <Form ref="shopData" :model="shopData" :rules="ruleValidate" :label-width="88" class="shop-form">
        <Row>
          <Col span="8">
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">基本信息</span>
            </Col>
          </Row>
          <Form-item label="商户名称：">
            {{shopData.name}}
          </Form-item>
          <Form-item label="管理员帐号：">
            {{shopData.account}}
          </Form-item>
          <Row>
            <Col span="12">
            <Form-item label="商户有效期：">
              <div v-if="shopData.validity == 0">长期有效</div>
              <div v-if="shopData.validity != 0">{{$formatDate(shopData.validity, 'yyyy-MM-dd h:m')}}</div>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="开业时间：">
              <div>{{$formatDate(shopData.openingTime, 'yyyy-MM-dd h:m')}}</div>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="创建时间：">
              <div>{{$formatDate(shopData.createTime, 'yyyy-MM-dd h:m')}}</div>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="更新时间：">
              <div>{{$formatDate(shopData.updateTime, 'yyyy-MM-dd h:m')}}</div>
            </Form-item>
            </Col>
          </Row>
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">财务信息</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="余额：">
              {{$formatMoney(shopData.balance)}}
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="冻结金额：">
              {{$formatMoney(shopData.freezingAmount)}}
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="回款方式：">
              <div>支付宝</div>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="回款帐号：">
              <div>327056088@qq.com</div>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="收款人：">
              <div>何先生</div>
            </Form-item>
            </Col>
            <!--判断是否有银行-->
            <Col span="12">
            <Form-item label="收款银行：">
              <div>判断是否有收款银行 有才显示</div>
            </Form-item>
            </Col>
          </Row>
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">联系信息</span></Col>
          </Row>
          <Form-item label="联系人：" prop="contacts">
            <Input v-model="shopData.contacts" placeholder="请填写联系人"></Input>
          </Form-item>
          <Form-item label="联系电话：" prop="tel">
            <Input v-model="shopData.phone" placeholder="请填写电话号码"></Input>
          </Form-item>
          <Form-item label="联系邮箱：" prop="email">
            <Input v-model="shopData.email" placeholder="请填写邮箱地址"></Input>
          </Form-item>
          <Form-item label="商铺备注：" prop="desc">
            <Input v-model="shopData.desc" type="textarea" :rows="4" placeholder="商铺200字简要说明(后台备注,前台无法浏览)..."></Input>
          </Form-item>
          </Col>
          <Col span="1">&nbsp;</Col>
          <Col span="8">
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">商铺信息</span>
            </Col>
          </Row>
          <Form-item label="区域商圈：">
            <Cascader :data="areaTree" v-model="shopData.areaValue" @on-change="se"></Cascader>
          </Form-item>
          <Form-item label="商铺类型：">
            <Cascader :data="categoryTree" v-model="shopData.categoryValue"></Cascader>
          </Form-item>
          <Form-item label="电话1：">
            <Input v-model="shopData.phone1" placeholder="请填写电话1"></Input>
          </Form-item>
          <Form-item label="电话2：">
            <Input v-model="shopData.phone2" placeholder="请填写电话2"></Input>
          </Form-item>
          <Form-item label="商铺地址：">
            <Input v-model="shopData.address" placeholder="请填写商铺地址"></Input>
          </Form-item>
          <Form-item label="靠近标识：">
            <Input v-model="shopData.nearWho" placeholder="请填写靠近标识地址"></Input>
          </Form-item>
          <Form-item label="地图坐标：">
            <Button type="info" icon="map" @click="mapModal = true">地图标注</Button>
            <span>（{{shopData.longitude}} - {{shopData.latitude}}）</span>
          </Form-item>
          <Form-item label="特色标签：" style="margin-bottom: 5px;">
            <Row>
              <Col span="14">
                <Input v-model="featureTag" placeholder="回车添加或点击添加(最多5个字符)" @on-enter="addFeatureTag"></Input>
              </Col>
              <Col span="1">&nbsp;</Col>
              <Col span="9">
                <Button type="primary" @click="addFeatureTag">添加</Button>
              </Col>
            </Row>
          </Form-item>
          <Form-item label="" style="margin-bottom: 10px;">
            <Tag v-for="item in featureTags" :key="item" :name="item" closable @on-close="handleCloseTag">{{item}}</Tag>
          </Form-item>
          <FormItem label="商家服务：" prop="serviceTag">
            <CheckboxGroup v-model="shopData.serviceTag">
              <Checkbox :label="item.id" v-for="(item, index) in serviceTags" :key="index">
                <i :class="'icon-font ' + item.icon" style="font-size: 13px;"></i>
                <span>{{item.name}}</span>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="营业时间：" prop="businessWeek">
            <CheckboxGroup v-model="shopData.businessWeek">
              <Checkbox label="1">周一</Checkbox>
              <Checkbox label="2">周二</Checkbox>
              <Checkbox label="3">周三</Checkbox>
              <Checkbox label="4">周四</Checkbox>
              <Checkbox label="5">周五</Checkbox>
              <Checkbox label="6">周六</Checkbox>
              <Checkbox label="7">周天</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="">
            <Row>
              <Col span="11">
              <FormItem prop="businessTimeStart">
                <TimePicker type="time" format="HH:mm" :steps="[1, 15]" placeholder="营业开始时间" v-model="shopData.businessTimeStart" @on-change></TimePicker>
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">至</Col>
              <Col span="11">
              <FormItem prop="businessTimeEnd">
                <TimePicker type="time" format="HH:mm" :steps="[1, 15]" placeholder="营业结束时间" v-model="shopData.businessTimeEnd"></TimePicker>
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="店铺状态：" prop="status">
            <RadioGroup v-model="shopData.status">
              <Radio label="0">锁定</Radio>
              <Radio label="1">正常</Radio>
              <Radio label="2">休店</Radio>
              <Radio label="3">关闭</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="1">&nbsp;</Col>
          <Col span="6">
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">相册</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Button type="ghost" @click="showShopAlbumModal('封面')">封面</Button>
              <Button type="ghost" @click="showShopAlbumModal('环境')">环境</Button>
              <Button type="ghost" @click="showShopAlbumModal('周边')">周边</Button>
            </Col>
          </Row>
          <br>
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">运维数据</span>
            </Col>
          </Row>
          <Row style="margin-bottom: 15px;">
            <Col span="6">
            <infoCard
              id-name="user_created_count"
              :end-val="count.createUser"
              color="#2d8cf0"
              intro-text="评论"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="visit_count"
              :end-val="count.visit"
              color="#64d572"
              intro-text="喜欢"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="collection_count"
              :end-val="count.collection"
              color="#ffd572"
              intro-text="浏览量"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="collection_count"
              :end-val="count.collection"
              color="#ffd572"
              intro-text="举报次数"
            ></infoCard>
            </Col>
          </Row>
          <Row style="margin-bottom: 15px;">
            <Col span="6">
            <infoCard
              id-name="user_created_count"
              :end-val="count.createUser"
              color="#2d8cf0"
              intro-text="综合评分"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="visit_count"
              :end-val="count.visit"
              color="#64d572"
              intro-text="服务"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="collection_count"
              :end-val="count.collection"
              color="#ffd572"
              intro-text="环境"
            ></infoCard>
            </Col>
            <Col span="6" class-name="padding-left-15">
            <infoCard
              id-name="collection_count"
              :end-val="count.collection"
              color="#ffd572"
              intro-text="口味"
            ></infoCard>
            </Col>
          </Row>
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">
            <span class="card-form-title">快捷面板</span></Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="8" class="col-plan">
            <div class="box">
              <div class="item">
                <Icon type="social-yen" class="icon"></Icon>
              </div>
              <div class="item" style="">财务明细</div>
            </div>
            </Col>
            <Col span="8" class="col-plan padding-left-15">
            <div class="box">
              <div class="item">
                <Icon type="clipboard" class="icon"></Icon>
              </div>
              <div class="item" style="">操作日志</div>
            </div>
            </Col>
            <Col span="8" class="col-plan padding-left-15">
            <div class="box">
              <div class="item">
                <Icon type="person-stalker" class="icon"></Icon>
              </div>
              <div class="item" style="">商铺管理员</div>
            </div>
            </Col>
          </Row>
          <Row style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px dashed #dedede">
            <Col span="24">

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
    <!--地图标注-->
    <Modal v-model="mapModal" width="700">
      <div slot="header" class="ivu-modal-header-inner">地图标注</div>
      <div id="map-container" class="map" style="width: 100%; height: 400px;"></div>
      <div slot="footer">
      </div>
    </Modal>
    <!--相册-->
    <Modal v-model="shopAlbumModal" width="730" class="album-modal">
      <div slot="header" class="ivu-modal-header-inner">{{shopAlbumTitle}}</div>
      <div class="album-box">
        <ul>
          <li v-for="(item, index) in img">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import infoCard from '@/components/info-card.vue';
  import {createScript, removeScript} from '@/libs/autoLoad';
  let map;
  export default {
    name: 'shopDetail',
    data () {
      return {
        shopData: {
          name: '',
          mail: '',
          date: '',
          time: '',
          desc: ''
        },
        categoryTree: [],
        areaTree: [],
        serviceTags: [],
        featureTag: '',
        featureTags: [],
        businessHours: [],
        ruleValidate: {
          mail: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ]
        },
        count: {
          createUser: 496,
          visit: 3264,
          collection: 1232,
          transfer: 39503498
        },
        //高德地图对象
        AMap: null,
        mapModal: false,
        shopAlbumModal: false,
        shopAlbumTitle: '',
        img: [
        ]
      };
    },
    components: {
      infoCard
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
            this.shopData = res.data.shopData;
            //店铺分类
            this.categoryTree = res.data.categoryTree;
            //区域分类
            this.areaTree = res.data.areaTree;
            //服务标签
            this.serviceTags = res.data.serviceTags;
            //特色标签
            this.featureTags = res.data.featureTags;
          }
        }).catch((response) => {});
      },
      //后退海阔天空
      goBack () {
        this.$router.go(-1);
      },
      //关闭移除特色服务标签
      handleCloseTag (event, name) {
        const index = this.featureTags.indexOf(name);
        this.featureTags.splice(index, 1);
      },
      //添加标签
      addFeatureTag() {
        if (!this.featureTag) {
          this.$Message.error('请先填写标签');
          return;
        }
        if (this.$strLen(this.featureTag) > 6) {
          this.$Message.error('标签最多6个字符');
          return false;
        }
        if (this.featureTags.length >= 10) {
          this.$Message.error('最多只能添加10组标签');
          return false;
        }
        this.featureTags.push(this.shopData.featureTag);
        this.shopData.featureTag = '';
      },
      se (v, d) {
        console.log(v, d);
      },
      initMap() {
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
          this.shopData.longitude = e.lnglat.getLng();
          this.shopData.latitude = e.lnglat.getLat();
        });
      },
      showShopAlbumModal (title) {
        this.shopAlbumModal = true;
        this.shopAlbumTitle = title;
      }
    },
    created () {
      let url = `https://webapi.amap.com/maps?v=1.3&key=${window.globalVar.GMap.key}`;
      let t = this;
      createScript(url, 'mapDom').then(function () {
        setTimeout(() => {
          t.initMap();
        }, 500);
      }).catch(function (error) {
        console.log('发生错误！', error);
      });
    },
    mounted () {
      //debugger;
      //服务端获取数据
      this.getData();
    },
    destroyed () {
      removeScript('mapDom');
    }
  };
</script>
