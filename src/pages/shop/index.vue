<template>
  <div>
    <Row class="mb-15">
      <i-col span="18" class="search">
        <Form :model="formSearch" :label-width="80" inline label-position="right">
          <Form-item label="商铺名称：">
            <Input v-model="formSearch.keywords" placeholder="请输入商铺名称关键词"></Input>
          </Form-item>
          <Form-item label="添加日期：">
            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.date"></Date-picker>
          </Form-item>
          <Form-item label="是否显示：">
            <Select v-model="formSearch.display" placeholder="请选择">
              <Option value="">请选择</Option>
              <Option value="1">显示</Option>
              <Option value="0">隐藏</Option>
            </Select>
          </Form-item>
          <Form-item label="节点状态：">
            <Select v-model="formSearch.status" placeholder="请选择">
              <Option value="">请选择</Option>
              <Option value="1">正常</Option>
              <Option value="0">锁定</Option>
              <Option value="-1">删除</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
          </Form-item>
        </Form>
      </i-col>
      <i-col span="6" class="text-align-right">
        <Button type="primary" @click="addModal = true">
          <Icon type="plus-round"></Icon>&nbsp;添加商铺
        </Button>
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
  export default {
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 60
          },
          {
            title: '商铺名称',
            key: 'name'
          },
          {
            title: '点评人数',
            key: 'commentNumber',
            align: 'center',
            width: 100
          },
          {
            title: '喜欢人数',
            key: 'likeNumber',
            align: 'center',
            width: 100
          },
          {
            title: '余额',
            key: 'balance',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', this.$formatMoney(params.row.balance, 2));
            }
          },
          {
            title: '冻结金额',
            key: 'freezingAmount',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', this.$formatMoney(params.row.freezingAmount, 2));
            }
          },
          {
            title: '状态',
            key: 'status',
            width: 115,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              let color = '';
              let text = '';
              if (row.status === '0') {
                color = '';
                text = '锁定';
              } else if (row.status === '1') {
                color = 'green';
                text = '正常';
              } else if (row.status === '2') {
                color = 'yellow';
                text = '休店';
              } else if (row.status === '3') {
                color = 'red';
                text = '关闭';
              } else {
                color = '';
                text = '未知';
              }
              ;
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
              return h('div', this.$formatDate(params.row.createTime));
            }
          },
          {
            title: '操作',
            key: 'operation',
            width: 85,
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
                      let id = params.row.id;
                      this.$router.push({path: '/shop/detail/' + id, params: {id: id}});
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        //搜索表单
        formSearch: {},
        //列表数据
        list: [],
        //总共数据多少条
        total: 0,
        //每页多少条数据
        pageSize: 1,
        //当前页码
        pageNumber: 1
      };
    },
    methods: {
      //分页切换页码
      changePage (page) {
        this.pageNumber = page;
        let search = this.formSearch;
        //let query = Object.assign({page: page}, search);
        //分页
        this.$router.push({name: this.$router.currentRoute.name, query: {page: page}});
        //获取最新数据
        this.getData({page: page, params: search});
      },
      getData (params) {
        if (!params) params = {page: 1};
        this.request('ShopList', params, true).then((res) => {
          if (res.status) {
            let list = res.data.list;
            if (list) {
              //列表数据
              this.list = list;
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
            //模块
            this.modules = res.data.modules;
          }
        }).catch((response) => {});
      }
    },
    mounted () {
      this.getData();
    },
    components: {}
  };
</script>
