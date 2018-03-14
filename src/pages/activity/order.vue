<template>
  <div>
    <Row>
      <i-col span="18" class="search">
      <Form :model="formSearch" :label-width="80" inline label-position="right">
        <Form-item label="活动名称：">
          <Input v-model="formSearch.keywords" placeholder="请输入文章关键词"></Input>
        </Form-item>
        <Form-item label="活动分类：">
          <Select v-model="formSearch.cateId" placeholder="请选择" style="width:90px">
            <Option value="">请选择</Option>
            <Option v-for="item in cate" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="支付状态：">
          <Select v-model="formSearch.payStatus" placeholder="请选择" style="width:90px">
            <Option value="">请选择</Option>
            <Option value="0">未支付</Option>
            <Option value="1">已支付</Option>
            <Option value="2">已退款</Option>
          </Select>
        </Form-item>
        <Form-item label="使用状态：">
          <Select v-model="formSearch.status" placeholder="请选择" style="width:90px">
            <Option value="">请选择</Option>
            <Option value="0">未使用</Option>
            <Option value="1">已使用</Option>
          </Select>
        </Form-item>
        <Form-item :label-width="1">
          <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
        </Form-item>
      </Form>
      &nbsp;
      </i-col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
    </Row>
  </div>
</template>

<script>
  export default{
    name: 'articleIndex',
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 50
          },
          {
            title: '订单号',
            key: 'orderSn',
            width: 150
          },
          {
            title: '活动名称',
            key: 'orderName'
          },
          {
            title: '所属分类',
            key: 'cateName',
            width: 200
          },
          {
            title: '联系人',
            key: 'contacts',
            width: 100
          },
          {
            title: '联系电话',
            key: 'mobile',
            width: 120
          },
          {
            title: '总金额',
            key: 'totalAmount',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$accDiv(params.row.totalAmount, 100) + '元');
            }
          },
          {
            title: '实际金额',
            key: 'actualAmount',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$accDiv(params.row.actualAmount, 100) + '元');
            }
          },
          {
            title: '支付状态',
            key: 'payStatus',
            width: 100,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const status = row.payStatus;
              let text = '';
              let type = 'default';
              if (status === '0') {
                text = '未支付';
              } else if (status === '1') {
                text = '已支付';
                type = 'success';
              } else if (status === '2') {
                text = '已退款';
                type = 'warning';
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: type,
                    size: 'small'
                  }
                }, text)
              ]);
            }
          },
          {
            title: '使用状态',
            key: 'status',
            width: 100,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const status = row.status;
              let text = '';
              let type = 'default';
              if (status === '0') {
                text = '未使用';
              } else if (status === '1') {
                text = '已使用';
                type = 'success';
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: type,
                    size: 'small'
                  }
                }, text)
              ]);
            }
          },
          {
            title: '下单时间',
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
            width: 90,
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
                      this.$router.push({path: '/activity/order_detail/' + params.row.id});
                    }
                  }
                }, '查看')
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
        //当前页码
        pageNumber: 1,
        //搜索表单
        formSearch: {},
        //分类
        cate: []
      };
    },
    components: {},
    methods: {
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
      //获取数据
      getData (params) {
        if (!params) params = {page: 1};
        this.request('ActivityOrder', params, true).then((res) => {
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
        });
      },
      edit(id) {
        this.$router.push({path: '/article/edit/' + id, params: {id: id}});
      },
      //删除文章数据
      remove (index, id) {
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>你确定要删除?删除后不可恢复!</p>',
          loading: true,
          onOk: () => {
            this.request('ArticleDelete', {id: id}).then((res) => {
              if (res.status) {
                this.$Message.info(res.msg);
                this.$Modal.remove();
                this.list[index].status = '2';
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
        //if(JSON.stringify(search) == "{}") return
        this.getData({params: search});
      },
      //获得分类数据
      getCate() {
        this.request('ActivityCategory', {}).then((res) => {
          if (res.status) {
            this.cate = res.data.list;
          }
        });
      }
    },
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
      //服务端获取数据
      this.getData();
      //服务端分类数据
      this.getCate();
    },
    beforeUpdate () {},
    updated () {},
    beforeDestroy () {},
    destroyed () {}
  };
</script>
