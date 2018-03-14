<template>
  <div>
    <table class="table">
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
          {{data.cateName}}
        </td>
      </tr>
      <template v-if="parseInt(data.goodsId) === 0 && data.attribute === ''">
      <tr>
        <th>商品价格</th>
        <td>
          {{$accDiv(parseInt(data.goodsPrice), 100)}}
        </td>
      </tr>
      <tr>
        <th>购买数量</th>
        <td>
          {{data.buyNumber}}
        </td>
      </tr>
      <tr>
        <th>总金额</th>
        <td>
          {{$accDiv(parseInt(data.totalAmount), 100)}}
        </td>
      </tr>
      <tr>
        <th>应付金额</th>
        <td>
          {{$accDiv(parseInt(data.actualAmount), 100)}}
        </td>
      </tr>
      <tr>
        <th>积分抵扣</th>
        <td>
          {{data.deductIntegral}}
        </td>
      </tr>
      <tr>
        <th>积分金额</th>
        <td>
          {{$accDiv(parseInt(data.integralMoney), 100)}}
        </td>
      </tr>
      </template>
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
          {{$formatDate(data.createTime)}}
        </td>
      </tr>
      <tr>
        <th>支付时间</th>
        <td v-if="data.payStatus === '1' || data.payStatus === '2'">
          {{$formatDate(data.payTime)}}
          <Button type="warning" size="small">退款</Button>
        </td>
        <td v-else>
          未支付
        </td>
      </tr>
      <tr v-if="data.payStatus === '2'">
        <th>退款时间</th>
        <td>
          {{$formatDate(data.refundTime)}}
        </td>
      </tr>
      <tr>
        <th>使用状态</th>
        <td v-if="data.status === '0'">
          未使用
        </td>
        <td v-else="data.status === '1'">
          已使用
        </td>
      </tr>
      </tbody>
    </table>
    <div class="order-body" v-if="parseInt(data.goodsId) > 0 && data.attribute !== ''">
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

    <div class="order-total">
      <ul>
        <li><span>抵扣积分：</span>{{data.deductIntegral}}</li>
        <li><span>积分金额：</span>￥{{$accDiv(parseInt(data.integralMoney), 100)}}</li>
      </ul>
      <div class="clear"></div>
      <div class="total">
        应付总额：
        <span class="money">¥{{$accDiv(parseInt(data.totalAmount), 100)}}</span>
        <template v-if="data.payStatus === '1' || data.payStatus === '2'">
          &nbsp;&nbsp;&nbsp;
          实付总额：
          <span class="money">¥{{$accDiv(parseInt(data.actualAmount), 100)}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
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
  .table {
    display: table;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    border-collapse: collapse;
    color: #666;
    border: 1px solid #CECECE;
    font-size: 12px;
  }

  .table thead th,
  .table thead td {
    background: #ECECEC;
    border-top: 1px solid #CECECE;
    border-bottom: 1px solid #CECECE;
    color: #666;
    padding: 5px 9px;
  }

  .table thead td {
    height: 40px;
    font-weight: bold;
  }

  .table tbody tr td,
  .table tbody tr th {
    border-bottom: solid 1px #E5E5E5;
    vertical-align: middle;
    height: 40px;
  }

  .table tbody tr th {
    text-align: right;
    padding-right: 10px;
    background: #F8F8F8;
    border-right: 1px solid #E5E5E5;
    color: #666;
    font-weight: 400;
    width: 200px;
  }

  .table tbody tr td {
    padding-left: 10px;
  }

  /*订单body*/
  .order-body {
    background: #fff;
    overflow: visible;
    margin-top: 15px;
  }

  .order-body dl {
    border-bottom: 1px solid #ededed;
  }

  .order-body dl dt {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .order-body dl.last {
    border: none;
  }

  .order-body .list {
    border-left: 0 solid #dedede;
  }

  .order-body .list table {
    border-collapse: collapse;
    border: 1px solid #dedede;
  }

  .order-body .list table tbody th {
    background: #f0f0f0;
    border-bottom: 1px solid #dedede;
    border-top: 1px solid #dedede;
    font-weight: normal;
    padding: 5px;
    text-align: center;
  }

  .order-body .list table tbody td {
    background: #FFFFFF;
    border-bottom: 1px solid #DEDEDE;
    text-align: center;
    font-weight: normal;
    padding: 5px;
  }

  .order-body .list table tbody td a {
    color: #005AA0;
  }

  .order-body .list table tbody td a.good {
    width: 50px;
    height: 50px;
    display: block;
    border: 1px solid #E1E1E1;
    margin: 0 auto;
  }

  .order-body .list table tbody td a.good img {
    width: 50px;
    height: 50px;
  }

  .order-body .list table tbody td a.good:hover {
    border: 1px solid #EDD28B;
  }

  .order-body .list table tbody td.tit {
    text-align: left;
  }

  .order-body .list table tbody td a.buy-again {
    /*background: url("../img/order/buy-again.png") no-repeat;*/
    display: block;
    height: 21px;
    line-height: 100px;
    margin: 5px auto 0;
    overflow: hidden;
    width: 73px;
  }

  .order-body .list table tbody td a.buy-again:hover {
    background-position: 0 -24px;
  }

  .order-body .list table tbody td span.price {
    color: #FF3434;
  }

  .order-total {
    padding: 15px 10px 0;
    overflow: hidden;
  }

  .order-total ul {
    padding: 0 0 10px 0;
    float: right;
    font-size: 14px;
    text-align: right;
  }

  .order-total .total {
    border-top: 1px solid #ccc;
    float: right;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 0 0;
    color: #333333;
  }

  .order-total .total .money {
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
