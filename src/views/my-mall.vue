<template>
  <div class="manage">
    <el-button type="primary" @click="add">+ 追加</el-button>
    <!-- 追加 -->
    <el-dialog title="詳細" :visible.sync="dialogVisible" :before-close="handleClose" width="500px">
      <el-form :inline="true" ref="form" :rules="rules" :model="form" class="demo-form-inline" label-width="120px">
        <el-form-item label="ID" prop="movie_id">
          <el-input v-if="this.form.goods_name" v-model="form.goods_id" disabled="disabled"></el-input>
          <el-input v-else v-model="this.form.movie_id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="写真" prop="movie_img">
          <img v-if="this.form.movie_img" :src="require(`../assets/images/${this.form.movie_img}`)" alt=""
            style="margin-left: 30px;width: 80px;height: 100px;">
          <img v-else src="../assets/images/picture.png" alt="" style="margin-left: 35px;width: 105px;height: 105px;">
          <el-upload class="avatar-uploader" action="http://127.0.0.1:3007/upload" :show-file-list="false"
            :on-preview="handlePreview" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
            :on-change="getLocalImg" :auto-upload="false">
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="タイトル" prop="movie_title">
          <el-input v-model="form.movie_title"></el-input>
        </el-form-item>
        <el-form-item label="副タイトル" prop="movie_subtitle">
          <el-input v-model="form.movie_subtitle"></el-input>
        </el-form-item>
        <el-form-item label="公開" prop="movie_data">
          <div class="block">
            <el-date-picker v-model="form.movie_data" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="監督" prop="movie_regulator">
          <el-input v-model="form.movie_regulator"></el-input>
        </el-form-item>
        <el-form-item label="出演" prop="movie_performers">
          <el-input v-model="form.movie_performers"></el-input>
        </el-form-item>
        <el-form-item label="解説" prop="movie_explain">
          <el-input v-model="form.movie_explain"></el-input>
        </el-form-item>
        <el-form-item label="上映情報" prop="movie_schedule">
          <el-button type="primary" @click="schedule">設定</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">キャンセル</el-button>
        <el-button type="primary" @click="submit">確認</el-button>
      </span>
    </el-dialog>

    <!-- スケジュール -->
    <el-dialog title="上映情報" :visible.sync="dialogVisible2" width="750px">
      <el-form :inline="true" ref="form" :rules="rules" :model="form2" class="demo-form-inline" label-width="90px">
        <el-form-item label="上演時間" prop="day">
          <el-date-picker type="date" v-model="form2.day" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="スクリーン" prop="screen">
          <el-select v-model="form2.screen">
            <el-option label="L1" value="L1"></el-option>
            <el-option label="L2" value="L2"></el-option>
            <el-option label="L3" value="L3"></el-option>
            <el-option label="M1" value="M1"></el-option>
            <el-option label="M2" value="M2"></el-option>
            <el-option label="S1" value="S1"></el-option>
            <el-option label="S2" value="S2"></el-option>
            <el-option label="S3" value="S3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="開始時間" prop="timeStart">
          <el-time-picker v-model="form2.timeStart" style="width: 100%;"></el-time-picker>
        </el-form-item>
        <el-form-item label="終了時間" prop="timeEnd">
          <el-time-picker v-model="form2.timeEnd" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-form>
      <el-table :data="form.movie_schedule" style="width: 100%">
        <el-table-column prop="day" label="上映時間" width="180">
        </el-table-column>
        <el-table-column prop="screen" label="スクリーン" width="180">
        </el-table-column>
        <el-table-column prop="timeStart" label="開始時間">
        </el-table-column>
        <el-table-column prop="timeEnd" label="終了時間">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="addSchedule">追加</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">確認</el-button>
      </span>
    </el-dialog>
    <div class="tab-content" style="width: 1200px;">
      <el-table stripe :data="movieList" style="width: 100%" height="100%">
        <el-table-column prop="name" label="">
          <template slot-scope="scope">
            <img :src="require(`../assets/images/${scope.row.img}`)" alt="" style="width: 120%;height:100%;"><img>
          </template>
        </el-table-column>
        <el-table-column prop="movieId" label="ID">
        </el-table-column>
        <el-table-column prop="title" label="タイトル">
        </el-table-column>
        <el-table-column prop="subtitle" label="副タイトル">
        </el-table-column>
        <el-table-column prop="data" label="公開">
        </el-table-column>
        <el-table-column prop="regulator" label="監督">
        </el-table-column>
        <el-table-column prop="performers" label="出演">
        </el-table-column>
        <el-table-column prop="explain" label="解説">
          <template slot-scope="scope">
            <span>{{ truncateText(scope.row.explain, 50) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">編集</el-button>
            <el-button size="mini" type="danger">削除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

import http from '../utils/request1'
import { getDate1, update1, update2 } from '../api/index1'
import fetchData from '../api/index2.js'
export default {
  data() {
    return {
      imageUrl: '',
      imageUrl2: '',
      files: [],
      dialogVisible: false,
      dialogVisible2: false,
      form: {
        movie_id: '',
        movie_img: '',
        movie_title: '',
        movie_subtitle: '',
        movie_data: '',
        movie_regulator: '',
        movie_performers: '',
        movie_explain: '',
        movie_schedule: []
      },
      rules: {
        goods_namej: [
          { required: true, message: '商品名を入力してください' }
        ],
        goods_price: [
          { required: true, message: '価格を入力してください' },
        ],
        goods_amount: [
          { required: true, message: '在庫数を入力してください' }
        ],
        // day: [
        //   { required: true, message: '上映時間を選択してください' }
        // ],
        // screen: [
        //   { required: true, message: 'スクリーンを選択してください' }
        // ],
        // timeStart: [
        //   { required: true, message: '開始時間を選択してください' }
        // ],
        // timeEnd: [
        //   { required: true, message: '終了時間を選択してください' }
        // ],
        goods_name: []
      },
      tableData: [],
      movieList: [],
      modulButton: 0,
      idPlus: 0,
      imgName: '',
      form2: {
        day: '',
        screen: '',
        timeStart: '',
        timeEnd: ''
      }
    }
  },
  methods: {
    add() {
      document.body.classList.add('modal-open');
      this.dialogVisible = true
      this.modulButton = 0
      this.idPlus = this.movieList.length + 1
      this.form.movie_id = this.idPlus
    },
    handlePreview() {
      console.log('a');
    },
    schedule() {
      this.dialogVisible2 = true
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, 30) + '...';
      }
      return text;
    },
    addSchedule() {
      let newObj = {
        day: '',
        screen: '',
        timeStart: '',
        timeEnd: ''
      }
      newObj.day = this.formatDateToJP(this.form2.day)
      newObj.screen = this.form2.screen
      newObj.timeStart = this.getTimeFromDate(this.form2.timeStart)
      newObj.timeEnd = this.getTimeFromDate(this.form2.timeEnd)
      this.form.movie_schedule.push(newObj)
      this.form2 = {}
    },
    // end图片部分
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          //データをfirebaseに追加

          this.$refs.form.resetFields()
          this.dialogVisible = false

          this.close()
        }
      })

      this.$message({
        type: 'success',
        message: '変更しました'
      })

    },
    close() {
      this.dialogVisible = false
      this.imageUrl2 = ''
      this.$refs.form.resetFields()
      this.form = {}
      console.log(this.form)
      this.files = []
    },
    handleClose() {
      this.close()
    },
    handleEdit(e) {
      this.form = JSON.parse(JSON.stringify(e))
      this.modulButton = 1
      this.dialogVisible = true
    },
    getUserList() {
      getDate1().then(({ data }) => {

        this.tableData = data

      })
    },
    pageChange(e) {
      this.pageData.page = e
      this.getUserList()
    },
    // start图片部分
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.path;
    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(isJPG);

      if (!isJPG) {
        this.$message.error('プロフィール画像のアップロードはJPG形式のみ対応しています');
      }
      if (!isLt2M) {
        this.$message.error('2MB以下の画像をアップロードしてください');
      }
      return isJPG && isLt2M;
    },
    getLocalImg(event, file) {
      console.log(event);
      // 获取上传图片的本地url，用于上传前的本地预览
      let url = '';
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      this.imageUrl2 = url;
      this.files = file
      this.form.movie_img = this.files[this.files.length - 1].name

      if (this.files.length > 1) {
        this.files = this.files.splice(1, 1)
      }

    },
    getTimeFromDate(dateObject) {
      const hours = String(dateObject.getHours()).padStart(2, '0');
      const minutes = String(dateObject.getMinutes()).padStart(2, '0');
      const seconds = String(dateObject.getSeconds()).padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
    formatDateToJP(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}年${month}月${day}日`;
    }
  },
  created() {
    this.getUserList()
    fetchData().then((res) => {
      this.movieList = res
      // console.log(this.movieList)
    })
  },

}
</script>

<style lang="less" scoped>
.manage {
  height: 100%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tab-content {
    height: calc(100% - 62px);
    position: relative;

    .pager {
      position: absolute;
      bottom: -40px;
      right: 20px;
    }
  }

  .avatar-uploader {
    /deep/.el-upload {
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    /deep/.el-upload:hover {
      border-color: #409EFF;
    }

    /deep/.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    /deep/.avatar {
      width: 110px;
      height: 150px;
      margin-top: 15px;
      // display: block;
    }
  }

  /deep/.el-table .el-table__cell {
    text-align: center;
  }
}
</style>