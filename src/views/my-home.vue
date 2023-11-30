<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
            <img v-if="this.form.account_img" :src="require(`../server/public/img/${this.form.account_img}.png`)" alt="">
            <div class="logininfo">
              <p class="name">{{ this.form.account_name }}</p>
              <!-- <p v-else class="name">xiaoxiao</p> -->
              <p class="work">{{ this.form.account_position }}</p>
              <!-- <p v-else class="work">職員</p> -->
            </div>
          </div>
          <div class="login-content">
            <p>時間&nbsp;&nbsp;&nbsp;:<span v-once>{{ gettime }}</span></p>
            <p>場所&nbsp;&nbsp;&nbsp;:<span>名古屋</span></p>
          </div>
        </el-card>
        <el-card class="box-card" style="height:744px; margin-top:20px; overflow: auto; text-align:center">
          <el-table :data="buyData" style="width: 100%">
            <el-table-column v-for="(item, index) in tablelabel" :key="index" :prop="index" :label="item">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16" style="padding-left:10px">
      <!-- {{ todaySum }} -->
      <div class="right">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0, }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="detail_price" style="font-weight:700;"> <i class="el-icon-trophy"></i>{{ item.value }}</p>
            <p class="detail_content">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:420px">
        <div ref="echarts1" style="height:400px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:500px">
          <div ref="echarts2" style="height:500px"></div>
        </el-card>
        <el-card style="height:500px">
          <div ref="echarts3" style="height:500px"></div>
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api/index.js'
import { getDate1 } from '../api/index1'
import * as echarts from 'echarts'
import { getAccountData } from '../api/index1'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      gettime: '',
      tableData: [
        { 'コカ・コーラ': 2567, 'ファンタ レモン': 2801, 'お茶': 3820, 'スプライト': 2138, 'ファンタ グレープ': 2602, 'ファンタ オレンジ': 3752, 'もも ソーダ水': 3752, 'オレンジジュース': 3752, 'コカ・コーラ スモール': 4752, 'コカ・コーラ コーヒー': 4752, 'ブラックコーヒー': 3752, 'ミルクコーヒー': 4752 },
        { 'コカ・コーラ': 3768, 'ファンタ レモン': 4422, 'お茶': 4220, 'スプライト': 2263, 'ファンタ グレープ': 3400, 'ファンタ オレンジ': 3041, 'もも ソーダ水': 3041, 'オレンジジュース': 4041, 'コカ・コーラ スモール': 4041, 'コカ・コーラ コーヒー': 3041, 'ブラックコーヒー': 4041, 'ミルクコーヒー': 3041 },
        { 'コカ・コーラ': 4753, 'ファンタ レモン': 3456, 'お茶': 4033, 'スプライト': 2031, 'ファンタ グレープ': 3525, 'ファンタ オレンジ': 2353, 'もも ソーダ水': 3353, 'オレンジジュース': 4353, 'コカ・コーラ スモール': 5353, 'コカ・コーラ コーヒー': 4353, 'ブラックコーヒー': 4353, 'ミルクコーヒー': 2353 },
        { 'コカ・コーラ': 3967, 'ファンタ レモン': 2642, 'お茶': 4728, 'スプライト': 3523, 'ファンタ グレープ': 4860, 'ファンタ オレンジ': 4022, 'もも ソーダ水': 2022, 'オレンジジュース': 4022, 'コカ・コーラ スモール': 4022, 'コカ・コーラ コーヒー': 5022, 'ブラックコーヒー': 4022, 'ミルクコーヒー': 4022 },
        { 'コカ・コーラ': 4261, 'ファンタ レモン': 3408, 'お茶': 4020, 'スプライト': 3636, 'ファンタ グレープ': 4506, 'ファンタ オレンジ': 4251, 'もも ソーダ水': 3251, 'オレンジジュース': 3251, 'コカ・コーラ スモール': 5251, 'コカ・コーラ コーヒー': 5251, 'ブラックコーヒー': 5251, 'ミルクコーヒー': 4251 },
        { 'コカ・コーラ': 4125, 'ファンタ レモン': 3572, 'お茶': 4177, 'スプライト': 3423, 'ファンタ グレープ': 3230, 'ファンタ オレンジ': 3156, 'もも ソーダ水': 4156, 'オレンジジュース': 4156, 'コカ・コーラ スモール': 5156, 'コカ・コーラ コーヒー': 5956, 'ブラックコーヒー': 5156, 'ミルクコーヒー': 3156 },
      ],
      videoData: [
        { name: 'コカ・コーラ', value: 8000 },
        { name: 'ファンタ レモン', value: 4999 },
        { name: 'お茶', value: 3500 },
        { name: 'スプライト', value: 3999 },
        { name: 'ファンタ グレープ', value: 6999 },
        { name: 'ファンタ オレンジ', value: 2999 },
        { name: 'もものソーダ水', value: 2999 },
        { name: 'オレンジジュース', value: 2999 },
        { name: 'コカ・コーラ スモール', value: 2999 },
        { name: 'コカ・コーラ コーヒー', value: 2999 },
        { name: 'ブラックコーヒー', value: 2999 },
        { name: 'ミルクコーヒー', value: 2999 },
      ],
      tablelabel: {
        goods_namej: '商品名',
        todayBuy: '本日の売上本数',
        monthBuy: '今月の売上本数',
        totalBuy: '総売上本数'
      },
      countData: [
        {
          name: "本日の売上本数",
          value: "",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今月の売上本数",
          value: "",
          icon: "s-goods",
          color: "#ffb980",
        },
        {
          name: "今年の総売上本数",
          value: "",
          icon: "s-flag",
          color: "#5ab1ef",
        },

      ],
      vendingData: [],
      buyData: [],
      name: [],
      token: '',
      form: {
        account_id: '',
        account_img: '',
        account_name: '',
        account_position: '',
        account_user: '',
        account_sex: '',
        account_age: '',

      },
    }
  },
  created() {
    getDate1().then(({ data }) => {
      console.log(data);
      this.vendingData = data
      let newVendingData = []
      this.vendingData.forEach(item => {
        const res = newVendingData.findIndex(ol => {
          return item.goods_namej === ol.goods_namej;
        })
        if (res !== -1) {
          newVendingData[res].monthBuy = newVendingData[res].monthBuy + item.monthBuy;
          newVendingData[res].yearBuy = newVendingData[res].yearBuy + item.yearBuy;
          newVendingData[res].totalBuy = newVendingData[res].totalBuy + item.totalBuy;
        } else {
          newVendingData.push(item);
        }
      })

      // 头像
      const token = Cookie.get('token')
      this.token = token

      const newV = this.delSameObjValue(this.vendingData, 'todayBuy', ['goods_namej'], ['todayBuy'])
      newVendingData.forEach((item) => {
        this.buyData.push(item)
      })

      const key = []

      newV.forEach((item, i) => {
        // console.log(item.goods_namej);
        key.push(item.goods_namej)
      })

      const container = []
      this.buyData.forEach(item => {
        container.push(item.yearBuy)
      })

      const total = []
      this.buyData.forEach(item => {
        total.push(item.totalBuy)
      })

      this.videoData.forEach((item, i) => {
        item.value = total[i]
        item.name = key[i]
      })

      //！！！！！！！！！！！！！！！！！！！ 把名字作为key 销售作为值组一个新的数组push进tableData里
      const newYearData = []
      key.map((v, i) => {
        const obj = {};
        obj[v] = container[i];
        newYearData.push(obj);
      })

      // 数组内多个对象转换成一个对象
      var resultObject = newYearData.reduce(function (result, currentObject) {
        for (var key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key];
          }
        }
        return result;
      }, {});

      this.tableData.push(resultObject)

      const todaySum = this.buyData.reduce((total, item) => {
        return total + item.todayBuy
      }, 0)

      const monthSum = this.buyData.reduce((total, item) => {
        return total + item.monthBuy
      }, 0)

      const yearSum = this.buyData.reduce((total, item) => {
        return total + item.yearBuy
      }, 0)

      this.countData[0].value = todaySum
      this.countData[1].value = monthSum
      this.countData[2].value = yearSum

      const newData = newV.map(item => item.goods_namej)
      this.name = newData


      getData().then(({ data }) => {
        const { tableData, orderDate, userData, videoData } = data.data

        // 折线图
        let echarts1 = echarts.init(this.$refs.echarts1)

        let xAxis = Object.keys(this.tableData[0])

        var echarts1option = {
          title: {
            text: '売上グラフ',
            left: 'center',
            textSyle: {
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: xAxis,
            align: 'left',
            top: '7%'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '20%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: orderDate.date
          },
          yAxis: {
            type: 'value'
          },
          series: [

          ]
        }

        xAxis.forEach(key => {
          echarts1option.series.push({
            name: key,
            type: 'line',
            data: this.tableData.map(item => item[key])
          })
        })

        echarts1.setOption(echarts1option);

        // 柱状图

        let echarts2 = echarts.init(this.$refs.echarts2)

        var echarts2option = {
          tooltip: {},
          legend: {
            data: ['新規登録会員', 'アクティブ会員'],
          },
          xAxis: {
            data: userData.map(item => item.date)
          },
          yAxis: {},
          series: [
            {
              name: '新規登録会員',
              type: 'bar',
              data: userData.map(item => item.new)
            },
            {
              name: 'アクティブ会員',
              type: 'bar',
              data: userData.map(item => item.active)
            }
          ]
        }

        echarts2.setOption(echarts2option);

        // 饼状图

        let echarts3 = echarts.init(this.$refs.echarts3)

        let echarts3option = {
          title: {
            text: '売上構成グラフ',
            left: 'center',
            textSyle: {
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} {b} : {c} ({d}%)'
          },
          legend: {
            top: '7%',
            left: 'center'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '50%',
              center: ['50%', '60%'],
              data: this.videoData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }

        echarts3.setOption(echarts3option);
      })
    })
    this.getUserList()
    this.getTime()

    const token = Cookie.get('token')
    this.token = token

  },
  methods: {
    getTime() {
      let yy = new Date().getFullYear();
      var mm =
        new Date().getMonth() > 9
          ? new Date().getMonth() + 1
          : new Date().getMonth() == 9
            ? new Date().getMonth() + 1
            : '0' + (new Date().getMonth() + 1);
      var dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

      this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;

    },
    delSameObjValue(arr, resultNum, keyName, keyValue) {
      const warp = new Map();
      arr.forEach(i => {
        let str = keyName.map(v => i[v]).join('_');
        i[resultNum] = keyValue.reduce((p, c) => p += i[c], 0);
        warp.has(str) ? warp.get(str)[resultNum] += i[resultNum] : warp.set(str, i);
      });
      return Array.from(warp).map(([, v]) => v);
    },
    getUserList() {
      getAccountData().then(({ data }) => {

        const token = Cookie.get('token')
        this.token = token

        if (token === 'admin') {
          this.form = data[0]
        } else {
          this.form = data[1]
        }
      })
    },
  },
  computed: {
    todaySum() {
      return this.buyData.reduce((total, item) => {
        total + item.todayBuy
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(220, 216, 216);

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .name {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .work {
    color: rgb(108, 106, 106);
  }
}

.login-content {
  p {
    color: rgb(108, 106, 106);
    font-size: 14px;
    margin-bottom: 5px;
    margin-left: 15px;

    span {
      margin-left: 50px;
    }
  }
}

.data {
  height: 440px;
}

.right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    font-size: 40px;
    height: 80px;
    width: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .detail_price {
      font-size: 28px;
      font-family: "Helvetica Neue";
    }

    .detail_content {
      font-size: 14px;
      color: #999;

    }
  }

  .el-card {
    // border: none;
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 48%;
  }
}
</style>