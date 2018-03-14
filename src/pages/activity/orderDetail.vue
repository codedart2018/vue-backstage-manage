<template>
  <div>
    <table class="hd-table hd-table-form hd-form">
      <thead>
      <tr>
        <td colspan="2">订单详情</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>订单号</th>
        <td>
          {{data.orderSn}}
        </td>
      </tr>
      <tr>
        <th>活动名称</th>
        <td>
          {{data.orderName}}
        </td>
      </tr>
      <tr>
        <th>活动分类</th>
        <td>
          何先生
        </td>
      </tr>
      <tr>
        <th>联系人</th>
        <td>
          {{data.contacts}}
        </td>
      </tr>
      <tr>
        <th>联系电话</th>
        <td>
          {{data.mobile}}
        </td>
      </tr>
      <tr>
        <th>备注说明</th>
        <td>
          {{data.remarks}}
        </td>
      </tr>
      <tr>
        <th>下单时间</th>
        <td>
          2018-02-09 09:12
        </td>
      </tr>
      <tr>
        <th>支付时间</th>
        <td>
          2018-02-09 09:12
        </td>
      </tr>
      </tbody>
    </table>
    <div class="order_body" v-if="data.goodsId > 0 && data.attribute !== ''">
      <dl class="last">
        <dt>商品清单</dt>
        <dd class="list">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <th width="10%"> 商品编号</th>
                <th width="30%"> 商品名称</th>
                <th width="20%"> 商品图片</th>
                <th width="10%"> 商品属性</th>
                <th width="7%"> 商品价格</th>
                <th width="7%"> 商品数量</th>
              </tr>
              <tr>
                <td>{{data.goodsId}}</td>
                <td>{{data.orderName}}</td>
                <td>
                  <div>
                    <a class="good">
                      <img :src="data.thumb + '?imageView2/1/w/64/h/64'"/>
                    </a></div>
                </td>
                <td>{{data.attribute}}</td>
                <td>
                  <span class="price">¥{{$accDiv(parseInt(data.goodsPrice), 100)}}</span>
                </td>
                <td>
                  <span class="price">{{data.buyNumber}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </dd>
      </dl>
    </div>

    <div class="order_total">
      <ul>
        <li><span>抵扣积分：</span>{{data.deductIntegral}}</li>
        <li><span>积分金额：</span>￥{{$accDiv(parseInt(data.integralMoney), 100)}}</li>
      </ul>
      <div class="clear"></div>
      <div class="total">
        应付总额：
        <span class="money">¥{{$accDiv(parseInt(data.totalAmount), 100)}}</span>&nbsp;&nbsp;&nbsp;
        实付总额：
        <span class="money">¥{{$accDiv(parseInt(data.actualAmount), 100)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  //todo 还有那个没有附加商品的时候
  export default {
    data () {
      return {
        id: this.$route.params.id,
        data: {}
      };
    },
    methods: {
      getData () {
        this.request('ActivityOrderDetail', {id: this.id}, true).then((res) => {
          if (res.status) {
            this.data = res.data;
          }
        });
      }
    },
    mounted () {
      this.getData();
    }
  };
</script>

<style lang="less" scoped>
  table {
    display: table;
    border-color: grey;
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .hd-table {
    margin: 0px;
    padding: 0px;
    width: 100%;
    border-collapse: collapse;
    color: #666;
  }

  .hd-table-form {
    font-size: 12px;
  }

  .hd-table-form thead th,
  .hd-table-form thead td {
    background: #ECECEC;
    border-top: 1px solid #CECECE;
    border-bottom: 1px solid #CECECE;
    color: #666;
    padding: 5px 9px;
  }

  .hd-table-form tbody tr td,
  .hd-table-form tbody tr th {
    border-bottom: solid 1px #E5E5E5;
    vertical-align: middle;
    height: 40px;
  }

  .hd-table-form tbody tr th {
    text-align: right;
    padding-right: 10px;
    background: #F8F8F8;
    border-right: 1px solid #E5E5E5;
    color: #666;
    font-weight: 400;
    width: 200px;
  }

  .hd-table-form tbody tr td {
    padding-left: 10px;
  }

  /*订单body*/
  .order_body {
    background: #fff;
    overflow: visible;
    margin-top: 15px;
  }

  .order_body dl {
    border-bottom: 1px solid #ededed;
  }

  .order_body dl dt {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .order_body dl.last {
    border: none;
  }

  .order_body .list {
    border-left: 1px solid #dedede;
  }

  .order_body .list table {
    border-collapse: collapse;
    border: 1px solid #dedede;
  }

  .order_body .list table tbody th {
    background: #f0f0f0;
    border-bottom: 1px solid #dedede;
    border-top: 1px solid #dedede;
    font-weight: normal;
    padding: 5px;
    text-align: center;
  }

  .order_body .list table tbody td {
    background: #FFFFFF;
    border-bottom: 1px solid #DEDEDE;
    text-align: center;
    font-weight: normal;
    padding: 5px;
  }

  .order_body .list table tbody td a {
    color: #005AA0;
  }

  .order_body .list table tbody td a.good {
    width: 50px;
    height: 50px;
    display: block;
    border: 1px solid #E1E1E1;
    margin: 0 auto;
  }

  .order_body .list table tbody td a.good img {
    width: 50px;
    height: 50px;
  }

  .order_body .list table tbody td a.good:hover {
    border: 1px solid #EDD28B;
  }

  .order_body .list table tbody td.tit {
    text-align: left;
  }

  .order_body .list table tbody td a.buy_again {
    /*background: url("../img/order/buy_again.png") no-repeat;*/
    display: block;
    height: 21px;
    line-height: 100px;
    margin: 5px auto 0;
    overflow: hidden;
    width: 73px;
  }

  .order_body .list table tbody td a.buy_again:hover {
    background-position: 0 -24px;
  }

  .order_body .list table tbody td span.price {
    color: #FF3434;
  }

  .order_total {
    padding: 15px 10px 0;
    overflow: hidden;
  }

  .order_total ul {
    padding: 0 20px 10px 0;
    float: right;
    font-size: 14px;
    text-align: right;
  }

  .order_total .total {
    border-top: 1px solid #ccc;
    float: right;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px 0 0;
    color: #333333;
  }

  .order_total .total .money {
    color: #f00;
    font-size: 24px;
  }

  .clear {
    height: 0;
    font-size: 0;
    line-height: 0;
    clear: both;
  }
</style>
