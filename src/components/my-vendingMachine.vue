<template>
  <div class="body">
    <div class="VendingM">
      <img class="vend" src="../assets/images/vending-machine.png" alt="">
      <div class="Button">
        <i class="button" ref="refbut" :class="buttonChange(item)" v-for="item in goodsList" :key="item.id"
          @click="buy(item)">{{ item.goods_price }}</i>
        <div class="drink">
          <div v-for="item in goodsList" :key="item.id" class="drink-children">
            <img :src="require(`../server/public/img/${item.goods_name}.png`)" alt="">
          </div>
        </div>
      </div>
      <div class="money">
        <img :src="require(`../assets/images/${item.coin_value}.png`)" v-for="item in coinList" :key="item.coin_id"
          @dragstart="dragstart(item.coin_value, $event)" draggable>
      </div>
      <div class="coin" @dragover.prevent @drop="drop"></div>
      <div class="moneyshow">
        <p class="buying">販売中</p>
        <p class="total">{{ total }}</p>
      </div>
      <div class="thousand" @click="thousandAdd"></div>
      <div class="remove" @click="remove"></div>
      <div class="surplus" @click="Surplus"></div>
      <div class="getGoods" @click="drawer = true">
        <div>
          <img class="goodsShow" ref="imgmove"
            :src="showGoods === '1' ? '' : require(`../server/public/img/${this.showGoods}.png`)"
            style="margin-bottom:8px;">
        </div>
        <p ref="bottomGoods"></p>
      </div>
      <div class="show">
        <el-carousel trigger="click" class="lunbotu" :interval=5000>
          <el-carousel-item v-for="item in 4" :key="item">
            <img :src="require(`../assets/images/${item}.png`)">
          </el-carousel-item>
        </el-carousel>
        <!-- <img src="../assets/images/d0103834_19442590.jpg" alt=""> -->
      </div>
    </div>
    <!-- <el-button @click="amountPlus">test用</el-button> -->
    <el-dialog title="お釣り" :visible.sync="dialogVisible" style="marginTop:300px" width="25%" :before-close="handleClose">
      <span class="el-icon-money"><i>￥{{ this.surplus }}</i></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getMoney">取り出す</el-button>
      </span>
    </el-dialog>

    <el-drawer title="商品一覧" :visible.sync="drawer" :direction="direction" :before-close="handleClose2">
      <div class="goodsBox">
        <div class="goodsContent" v-for="(item, index) in buysList" :key="index">
          <!-- <img :src="require(`../assets/images/${item}.png`)" alt=""> -->
          <img :src="require(`../server/public/img/${item}.png`)" alt="" style="width: 53px; height: 108px;">
        </div>
      </div>
      <el-button type="primary" @click="takeGoods">取り出す</el-button>
    </el-drawer>

  </div>
</template>

<script>
import { getDate1, update, test } from '../api/index1'
export default {
  name: 'vendingMachine',
  data() {
    return {
      goodsList: [

      ],
      coinList: [
        { coin_id: 1, coin_value: 10, },
        { coin_id: 2, coin_value: 50 },
        { coin_id: 3, coin_value: 100 },
      ],
      buysList: [

      ],
      total: 0,
      surplus: 0,
      dragPicture: '',
      dialogVisible: false,
      dialogVisible2: false,
      count: 0,
      drawer: false,
      direction: 'btt',
      showGoods: '1',
      todayBuy: 0,
      monthBuy: 0,
      yearBuy: 0,
      totalBuy: 0
    }
  },
  methods: {
    buttonChange(e) {
      if (this.total >= e.goods_price && e.goods_amount > 0) {
        return 'green'
      } else if (e.goods_amount === 0) {
        return 'red'
      } else {
        return 'gray'
      }
    },
    getGoods() {
      getDate1().then(res => {
        this.goodsList = res.data
      }).catch(err => {
        console.log(err.message);
      })
    },
    thousandAdd() {
      this.total += 1000
      this.butanimation()
    },
    dragstart(e) {
      this.dragPicture = e
    },
    drop() {
      this.total += this.dragPicture
      this.butanimation()
    },
    butanimation() {
      let refbut = this.$refs.refbut
      refbut.forEach(item => {
        item.style.animation = 'butColor 0.3s 5'
      }
      )
    },
    remove() {
      this.surplus = this.total + this.surplus
      this.total = 0
      this.ani = true
      let refbut = this.$refs.refbut
      refbut.forEach(item => {
        item.style.animation = ''
      }
      )
    },
    Surplus() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleClose2(done) {
      if (this.buysList.length === 0) {
        this.drawer = false
      } else {
        this.$confirm('商品を取り出すのを忘れないでください。')
          .then(_ => {
            done();
          })
          .catch(_ => { })
      }

    },
    getMoney() {
      this.dialogVisible = false
      this.surplus = 0
    },
    buy(e) {

      if (this.total < e.goods_price || e.goods_amount === 0) return
      this.showGoods = e.goods_name
      this.total -= e.goods_price
      this.buysList.push(e.goods_name)
      if (e.goods_amount > 0) {
        this.count = e.goods_amount - 1
      }

      this.todayBuy = e.todayBuy + 1
      this.monthBuy = e.monthBuy + 1
      this.yearBuy = e.yearBuy + 1
      this.totalBuy = e.totalBuy + 1

      this.$refs.refbut.forEach(item => {
        item.style.pointerEvents = 'none'
      })

      this.$refs.imgmove.style.animation =
        'butdown 2s linear forwards,butright 1s linear 2s forwards,butopacity 0s linear 3s forwards,butup 2s linear 3s forwards,butmiddle 1s linear 3s forwards'

      this.$refs.bottomGoods.style.animation = 'bottomdown 2s linear forwards,buttomup 2s linear 3s forwards'
      setTimeout(() => {
        this.$refs.imgmove.style.animation = ''
        this.$refs.bottomGoods.style.animation = ''
        this.showGoods = '1'
        this.$refs.refbut.forEach(item => {
          item.style.pointerEvents = 'auto'
        })
      }, 5500)

      update({
        params: {
          goods_amount: this.count,
          goods_id: e.goods_id,
          todayBuy: this.todayBuy,
          monthBuy: this.monthBuy,
          yearBuy: this.yearBuy,
          totalBuy: this.totalBuy
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.getGoods()
        } else {
          this.$message({
            message: 'error',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log(err);
      })
    },
    takeGoods() {
      this.drawer = false
      this.buysList = []
    },

  },
  mounted() {
    this.getGoods()

  }
}
</script>

<style lang="less" scoped>
@import '../assets//css/animation.css';

.body {
  position: relative;
  height: 100vh;
  overflow: hidden;



}

.VendingM {
  position: absolute;
  width: 617px;
  top: 0;
  left: 650px;

  .drink {
    position: absolute;
    top: -117px;
    left: -12px;
    width: 400px;
    pointer-events: none;

    .drink-children {
      display: inline-block;
      margin-right: 4px;
      margin-bottom: 41px;

    }

    .drink-children:nth-child(6) {
      margin-right: 5px;
    }

    .drink-children:nth-child(9) {
      margin-right: 6px !important;
    }

    .drink-children:nth-child(13) {
      margin-right: 6px;
    }

    .drink-children:nth-child(7n) {
      margin-right: 0px;
    }

    .drink-children:nth-child(n+8):nth-child(-n+10) {
      margin-right: 5px;
    }

    .drink-children:nth-child(n+11):nth-child(-n+14) {
      margin-right: 5.5px;
    }

    .drink-children:nth-child(n+15):nth-child(-n+21) {
      margin-right: 5.5px;
    }

    .drink-children:nth-child(-n+7)>img {
      width: 53px;
      height: 108px;
    }
  }

  .vend {
    height: 933px;
  }

  .Button {
    position: absolute;
    top: 190px;
    left: 124px;
  }

  .button {
    display: inline-block;
    border-radius: 40%;
    width: 31px;
    height: 16px;
    // background: linear-gradient(to bottom, #dfdede 5%, #bab1ba 100%);
    // background-color: #bbb9b9;
    border: none;
    margin-right: 26px;
    margin-bottom: 133px;
    display: inline-block;
    font-style: normal;
    font-size: 8px;
    font-weight: 700;
    text-align: center;
    line-height: 15px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    // animation: butColor 0.5s 10;
    transition: all 0.5s linear;



  }

  .button:hover {
    background: linear-gradient(to bottom, #525252 5%, #a3a3a3 100%);
    background-color: #959095;
  }

  .button:active {
    position: relative;
    top: 2px;
  }

  .button:nth-child(7n) {
    margin-right: 64px;
  }

  .button:nth-child(n+8):nth-child(-n+14) {
    margin-bottom: 107px;
  }

  .money {
    position: absolute;
    right: -400px;
    top: 100px;
    height: 270px;
    width: 300px;
    // background-color: pink;
    display: flex;
    flex-direction: column;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 20px;
      cursor: move;
    }
  }

  .moneyshow {
    position: absolute;
    right: 180px;
    bottom: 359px;
    width: 86px;
    height: 45px;
    background-color: rgb(79, 78, 78);
    // border: 1px solid #fff;
    border-radius: 7px;

    .buying {
      margin: 0;
      font-size: 12px;
      text-align: right;
      padding-right: 5px;
      padding-top: 2px;
      color: #ffaa2b;
      font-weight: 700;
      text-shadow: 0 0 2px #eca367
    }

    .total {
      margin: 0;
      font-size: 16px;
      color: #ffffff;
      text-shadow: 0 0 3px #ffffff;
      padding-left: 13px;
    }

  }


  .coin {
    position: absolute;
    right: 72px;
    bottom: 349px;
    width: 35px;
    height: 35px;
  }

  .thousand {
    position: absolute;
    right: 181px;
    bottom: 278px;
    width: 85px;
    height: 60px;
    cursor: pointer;
    // border: 1px solid #fff;
  }

  .remove {
    position: absolute;
    right: 122px;
    bottom: 321px;
    width: 40px;
    height: 40px;
    // background-color: green;
    cursor: pointer;
    // border: 1px solid #fff;
  }

  .surplus {
    position: absolute;
    right: 45px;
    bottom: 135px;
    width: 80px;
    height: 55px;
    // background-color: yellow;
    cursor: pointer;
    // border: 1px solid #fff;
  }

  .getGoods {
    position: absolute;
    left: 57px;
    bottom: 89px;
    width: 398px;
    height: 101px;
    cursor: pointer;

    img {
      position: absolute;
      bottom: 500px;
      left: 0;
      border-radius: 10px;
      transition: all 1s linear;
      pointer-events: none;
      width: 53px;
      height: 108px;
      border: none;
    }

    img[src=""] {
      display: none;
    }

    p {
      position: absolute;
      bottom: 490px;
      left: 8px;
      width: 32px;
      height: 8px;
      background-color: #4f4e4e;
      border-radius: 15px;
      pointer-events: none
    }
  }

  .show {
    position: absolute;
    left: 40px;
    bottom: 193px;
    width: 260px;
    height: 242px;
    background-color: #e71f19;
    border-radius: 5px;

    .el-tag {
      position: absolute;
      right: 0;
      top: 0;
    }

    h3 {
      text-align: center;
      color: #525050;
    }

    .lunbotu {
      width: 304px;
      height: 230px;
      background-color: #e71f19;
      overflow: hidden;
    }

    img {
      position: absolute;
      top: 28px;
      left: 27px;
      width: 252px;
      height: 165px;
      border-radius: 5px;
      border: 2px solid #82191c;
      box-sizing: border-box;
    }
  }

  .green {
    background: linear-gradient(to bottom, #3c7e44 5%, #09ef24 100%);
    background-color: #6cb174;
  }

  .gray {
    background: linear-gradient(to bottom, #dfdede 5%, #bab1ba 100%);
    background-color: #bbb9b9;
  }

  .red {
    background-color: #ae1414;
  }

  .opone {
    opacity: 1;
  }

  .opzero {
    opacity: 0;
  }
}

.el-dialog {
  .el-dialog__body {
    span {
      margin-left: 90px;
      font-size: 40px;
    }
  }

}

.el-drawer {
  position: relative;

  .el-drawer__header>:first-child {
    font-size: 25px;
  }

  .el-button {
    // margin-left: 70px;
    position: absolute;
    right: 40px;
    bottom: 15px;
    font-size: 15px;

  }

  .goodsBox {
    display: flex;
    flex-wrap: wrap;
    padding: 0 50px 0 50px;


    .goodsContent {
      position: relative;
      width: 86px;
      height: 120px;
      vertical-align: bottom;

      img {
        position: absolute;
        bottom: 0;
      }
    }
  }

  .disable {
    pointer-events: none;
  }

  @keyframes butColor {
    0% {
      background: linear-gradient(to bottom, #b8b8b8 5%, #bab1ba 100%);
      background-color: #bbb9b9;
    }

    25% {
      background: linear-gradient(to bottom, #3c7e44 5%, #09ef24 100%);
      background-color: #6cb174;
    }

    50% {
      background: linear-gradient(to bottom, #b8b8b8 5%, #bab1ba 100%);
      background-color: #bbb9b9;
    }

    75% {
      background: linear-gradient(to bottom, #3c7e44 5%, #09ef24 100%);
      background-color: #6cb174;
    }

    100% {
      background: linear-gradient(to bottom, #b8b8b8 5%, #bab1ba 100%);
      background-color: #bbb9b9;

    }
  }

  @keyframes butdown {
    0% {
      bottom: 490px;
    }

    100% {
      bottom: 0px;
    }
  }

  @keyframes bottomdown {
    0% {
      bottom: 490px;
    }

    100% {
      bottom: 0px;
    }
  }

  @keyframes butright {
    0% {
      transform: rotate(30deg);
      transform-origin: 100% 100%;
    }

    100% {
      transform: rotate(90deg);
      transform-origin: 100% 100%;
    }
  }

  @keyframes butup {
    0% {
      bottom: 0px;
    }

    100% {
      bottom: 490px;
    }
  }

  @keyframes buttomup {
    0% {
      bottom: 0px;
    }

    100% {
      bottom: 490px;
    }
  }

  @keyframes butmiddle {
    0% {
      transform: rotate(90deg);
      transform-origin: 100% 100%;
    }

    100% {
      transform: rotate(0deg);
      transform-origin: 100% 100%;
    }
  }

  @keyframes butopacity {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}
</style>