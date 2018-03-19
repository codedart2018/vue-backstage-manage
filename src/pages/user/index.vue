<template>
  <div>
    <Row class="mb-15">
      <i-col span="24" class="search">
        <Form :model="formSearch" :label-width="80" inline label-position="right">
          <Form-item label="用户呢称：">
            <Input v-model="formSearch.nickname" placeholder="请输入用户呢称"></Input>
          </Form-item>
          <Form-item label="用户姓名：">
            <Input v-model="formSearch.realName" placeholder="请输入用户姓名"></Input>
          </Form-item>
          <Form-item label="手机号码：">
            <Input v-model="formSearch.mobile" placeholder="请输入手机号"></Input>
          </Form-item>
          <Form-item label="开始日期：">
            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.startTime"></Date-picker>
          </Form-item>
          <Form-item label="结束日期：">
            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.endTime"></Date-picker>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="ghost" @click="formSearch = {}">清空条件</Button>
          </Form-item>
        </Form>
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
            align: 'center',
            width: 60
          },
          {
            title: 'CenterId',
            key: 'centerId',
            align: 'center',
            width: 100
          },
          {
            title: '用户呢称',
            align: 'center',
            key: 'nickname'
          },
          {
            title: '真实姓名',
            align: 'center',
            key: 'realName'
          },
          {
            title: '电话号码',
            align: 'center',
            key: 'mobile'
          },
          {
            title: '积分',
            align: 'center',
            key: 'integral'
          },
          {
            title: 'VIP等级',
            align: 'center',
            key: 'vipLevel'
          },
          {
            title: '是否关注',
            width: 130,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const type = row.subscribe === '1' ? 'success' : 'dashed';
              const text = row.subscribe === '1' ? '已关注' : '未关注';
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
            title: '注册时间',
            key: 'createTime',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$formatDate(params.row.createTime));
            }
          },
          {
            title: '操作',
            key: 'operation',
            width: 80,
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
                      this.$router.push({
                        path: '/user/detail/' + id
                      });
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
        formSearch: {}
      };
    },
    components: {},
    methods: {
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
        this.request('UserList', params, true).then((res) => {
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
      //表单搜索
      search () {
        this.pageNumber = 1;
        let search = this.formSearch;
        this.getData({params: search});
      }
    },
    beforeCreate () {},
    created () {},
    mounted () {
      //服务端获取数据
      this.getData();
    }
  };
</script>
