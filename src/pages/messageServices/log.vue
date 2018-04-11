<template>
  <div>
    <Row class="mb-15">
      <i-col span="24" class="search">
        <Form :model="formSearch" :label-width="80" inline label-position="right">
          <Form-item label="模板名称：">
            <Input v-model="formSearch.name" placeholder="请输入模板名称"></Input>
          </Form-item>
          <Form-item label="接收方：">
            <Input v-model="formSearch.recipients" placeholder="请输入接收方"></Input>
          </Form-item>
          <Form-item label="服务类型：">
            <Select v-model="formSearch.type" placeholder="请选择" style="width: 150px;">
              <Option value="">请选择</Option>
              <Option value="1">短信</Option>
              <Option value="2">邮件</Option>
            </Select>
          </Form-item>
          <Form-item label="发送日期：">
            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.startTime"></Date-picker>
          </Form-item>
          <Form-item label="结束日期：">
            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.endTime"></Date-picker>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
          </Form-item>
          <Form-item :label-width="1">
            <Button type="ghost" @click="clearSearch()">清空条件</Button>
          </Form-item>
        </Form>
      </i-col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
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
            title: '模板服务ID',
            key: 'servicesId',
            width: 100
          },
          {
            title: '模板名称',
            align: 'center',
            width: 350,
            render: (h, params) => {
              return h('div', {
                style: {
                  textAlign: 'center'
                }
              }, params.row.name);
            }
          },
          {
            title: '类型',
            width: 80,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const text = row.type === '1' ? '短信' : row.type === '2' ? '邮件' : '未知';
              return h('div', text);
            }
          },
          {
            title: '接收方',
            key: 'recipients',
            width: 120,
            align: 'center'
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center'
          },
          {
            title: '发送IP',
            key: 'ip',
            width: 90,
            align: 'center'
          },
          {
            title: '发送状态',
            align: 'status',
            width: 100,
            render: (h, params) => {
              const row = params.row;
              const text = row.status === '0' ? '失败' : row.status === '1' ? '成功' : '失败';
              return h('div', text);
            }
          },
          {
            title: '发送时间',
            key: 'createTime',
            width: 135,
            align: 'center',
            render: (h, params) => {
              return h('div', this.$formatDate(params.row.createTime, 'yyyy-MM-dd h:m'));
            }
          }
        ],
        //列表数据
        list: [],
        //总共数据多少条
        total: 0,
        //每页多少条数据
        pageSize: 1,
        //搜索表单
        formSearch: {}
      };
    },
    methods: {
      //分页切换页码
      changePage (page) {
        let search = this.formSearch;
        let query = Object.assign({page: page}, search);
        //分页
        this.$router.push({name: this.$router.currentRoute.name, query: query});
        //获取最新数据
        this.getData({page: page, params: search});
      },
      getData (params) {
        if (!params) params = {page: 1};
        this.request('MessageServicesLog', params, true).then((res) => {
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
        }).catch((response) => {
        });
      },
      edit (index) {
        //打开 modal 窗口
        this.editModal = true;
        //获取原数据
        this.editForm = this.list[index];
      },
      //表单搜索
      search() {
        this.pageNumber = 1;
        let search = this.formSearch;
        this.getData({params: search});
      },
      //清除搜索
      clearSearch() {
        this.formSearch = {};
        this.getData();
      }
    },
    mounted() {
      //服务端获取数据
      this.getData();
    }
  };
</script>
