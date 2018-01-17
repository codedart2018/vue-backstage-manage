<template>
  <div>
    <Row class="mb-15">
      <Col span="18" class="search">
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
      </Col>
      <Col span="6" class="text-align-right">
      <Button type="primary" @click="$router.push({path: '/activity/add'})">
        <Icon type="plus-round"></Icon>&nbsp;添加活动
      </Button>
      </Col>
    </Row>
    <Row class="mb-15">
      <Table :columns="columns" :data="list"></Table>
    </Row>
    <Row type="flex" justify="end">
      <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
    </Row>
  </div>
</template>
<style scoped>
  .mb-15 {
    margin-bottom: 15px;
  }
</style>
<script>
  export default {
    data () {
      return {
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
        columns: [
          {
            title: '活动ID',
            width: 90,
            key: 'id'
          },
          {
            title: '活动名称',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '参与',
            width: 70,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.attend);
            }
          },
          {
            title: '访问',
            width: 70,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.visits);
            }
          },
          {
            title: '活动时间',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('p', this.$formatDate(params.row.start_time, 'yyyy-MM-dd hh:mm:ss')),
                h('p', this.$formatDate(params.row.end_time, 'yyyy-MM-dd hh:mm:ss'))
              ]);
            }
          },
          {
            title: '状态',
            width: 135,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              if (row.status === '0') {
                return h('div', [
                  h('Button', {
                    props: {
                      size: 'small',
                      disabled: 'disabled'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '未开始'),
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.switchStatus(params.index, row.id, '1');
                      }
                    }
                  }, '开始')
                ]);
              } else if (row.status === '1') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '进行中'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.switchStatus(params.index, row.id, '2');
                      }
                    }
                  }, '暂停')
                ]);
              } else if (row.status === '2') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '暂停中'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.switchStatus(params.index, row.id, '1');
                      }
                    }
                  }, '开始')
                ]);
              } else if (row.status === '3') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small',
                      disabled: 'disabled'
                    }
                  }, '已结束')
                ]);
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small',
                      disabled: 'disabled'
                    }
                  }, '已过期')
                ]);
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.data(row.id, row.type);
                    }
                  }
                }, '数据'),
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
                      this.show(row.id, row.type);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    methods: {
      //查看活动
      show (id, type) {
        if (!type && typeof type !== 'string') {
          this.$Message.error('查看活动异常');
          return false;
        }
        this.$router.push({path: '/activity/' + type + '/edit/' + id});
      },
      //查看详细数据
      data(id, type) {
        if (!type && typeof type !== 'string') {
          this.$Message.error('查看活动异常');
          return false;
        }
        this.$router.push({path: '/activity/index/data/' + id});
      },
      //活动状态切换
      switchStatus (index, id, status) {
        let msg = '';
        if (status === '1') {
          msg = '您确定要开始活动?';
        } else if (status === '2') {
          msg = '您确定要暂停活动?';
        }
        this.$Modal.confirm({
          title: '温馨提示',
          width: 300,
          content: '<p>' + msg + '</p>',
          loading: true,
          onOk: () => {
            this.request('ActivitySwitchStatus', {id: id, status: status}).then((res) => {
              if (res.status) {
                this.$Message.info(res.msg);
                this.$Modal.remove();
                this.list[index].status = status;
              } else {
                this.$Message.error(res.msg);
                this.$Modal.remove();
              }
            }).catch((response) => {});
          }
        });
      },
      getData (params = {}) {
        if (!params) params = {page: 1};
        this.request('ActivityList', params, true).then((res) => {
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
        }).catch((response) => {});
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
      }
    },
    mounted() {
      //服务端获取数据
      this.getData();
    }
  };
</script>
