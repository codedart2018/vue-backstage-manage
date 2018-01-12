<template>
  <Card :padding="0">
    <div class="info-card-con">
      <Row type="flex" align="middle" justify="center" class="height-100">
        <div>
          <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}"><span v-cloak :id="idName">{{ number }}</span><span>{{ unit }}</span>
          </p>
          <p class="info-intro-text" slot="intro">{{ introText }}</p>
        </div>
      </Row>
    </div>
  </Card>
</template>

<style scoped>
  .info-card-con {
    height: 85px;
    cursor: pointer;
  }
  .height-100 {
    height: 100%;
  }
  .info-intro-text {
    font-size: 12px;
    font-weight: 500;
    color: #989898;
    text-align: center;
  }
</style>

<script>
  function transformValue (val) {
    let endVal = 0;
    let unit = '';
    if (val < 1000) {
      endVal = val;
    } else if (val >= 1000 && val < 1000000) {
      endVal = parseInt(val / 1000);
      unit = 'K+';
    } else if (val >= 1000000 && val < 10000000000) {
      endVal = parseInt(val / 1000000);
      unit = 'M+';
    } else {
      endVal = parseInt(val / 1000000000);
      unit = 'B+';
    }
    return {
      val: endVal,
      unit: unit
    };
  }
  export default{
    name: 'infoCard',
    data () {
      return {
        unit: '',
        number: 0
      };
    },
    components: {},
    props: {
      idName: String,
      className: String,
      endVal: Number,
      color: String,
      iconType: String,
      introText: String,
      countSize: {
        type: String,
        default: '20px'
      },
      countWeight: {
        type: Number,
        default: 700
      }
    },
    mounted () {
      let res = transformValue(this.endVal);
      this.unit = res.unit;
      this.number = res.val;
    }
  };
</script>
