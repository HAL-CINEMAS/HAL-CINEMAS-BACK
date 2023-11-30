<template>
  <div>
    <el-row>
      <el-col :span="6" style="padding-right: 10px;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form label-position="left" label-width="100px" :model="form" ref="form" style="height: 721px;">
              <el-form-item label="プロフィール">
                <img v-if="this.form.account_img" :src="require(`../server/public/img/${this.form.account_img}.png`)"
                  alt="" class="profile">
                <!-- <img v-if="this.form.account_img" :src="testimageUrl" class="profile"> -->
                <el-upload class="avatar-uploader" action="http://127.0.0.1:3007/upload" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="getLocalImg">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="アカウント">
                <!-- <el-input v-model="form.account_user" style="width:60% " disabled="disabled"></el-input> -->
                <P style="color:#c0c4cc;font-size: 16px;">{{ form.account_user }}</P>
              </el-form-item>
              <el-form-item label="役職">
                <el-radio-group v-model="form.account_position" disabled="disabled">
                  <el-radio label="管理社員"></el-radio>
                  <el-radio label="一般社員"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="名前">
                <el-input v-model="form.account_name" style="width:60%"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="form.account_sex" placeholder="" style="width:60%">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生年月日">
                <el-date-picker v-model="form.account_age" type="date" placeholder="" value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions" style="width:60%">
                </el-date-picker>
              </el-form-item>
              <el-button type="primary" @click="submit" style="margin-left: 145px;">変更</el-button>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" style="padding-left: 10px;">
        <div class="grid-content bg-purple-light">
          <el-card>
            <div class="con-list">
              <el-calendar ref="calendar">
                <template slot="dateCell" slot-scope="{date, data}">
                  <div>
                    <div :class="(date.getDay() == 6 || date.getDay() == 0) ? 'weeked' : 'notweeked'"
                      @click="messageUp(data)">{{ data.day }}
                    </div>
                    <div class="cell" v-for="(item, index) in tableData" :key="index">
                      <div v-if="data.day == item.calendar_date">
                        <div class="info">
                          <i v-if="item.calendar_class == 1" class="el-icon-chat-line-square"
                            style="color:red;font-size: 20px;"></i>
                          <i v-else-if="item.calendar_class == 2" class="el-icon-chat-line-square"
                            style="color:blue;font-size: 20px;"></i>
                          <i v-else-if="item.calendar_class == 3" class="el-icon-chat-line-square"
                            style="color:green;font-size: 20px;"></i>
                          <p class="content">{{ item.calendar_content | show(17) }} </p>
                          <i v-if="item.calendar_status == 'done'" class="done">✔️</i>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-calendar>
            </div>
          </el-card>

        </div>
      </el-col>
    </el-row>
    <el-dialog title="個人スケジュール" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="calendarData" :model="calendarData" label-width="80px">
        <el-form-item label="日時">
          <el-input v-model="calendarData.calendar_date" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="レベル">
          <el-select v-model="calendarData.calendar_class" placeholder="">
            <el-option label="最重要予定" value="1"></el-option>
            <el-option label="重要予定" value="2"></el-option>
            <el-option label="予定" value="3"></el-option>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状態">
          <el-select v-model="calendarData.calendar_status" placeholder="">
            <el-option label="完成" value="done"></el-option>
            <el-option label="未完成" value="undone"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model.lazy="calendarData.calendar_content" style="height:200px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="del" class="delclass">削除</el-button>
        <el-button @click="handleClose">キャンセル</el-button>
        <el-button type="primary" @click="addorup">確定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAccountData, updateAccount, getcalendarData, updatcalendarData, addcalendarData, getcalendarData1, updatcalendarData1, addcalendarData1, delcalendarData, delcalendarData1 } from '../api/index1'
import http from '../utils/request1'
import Cookie from 'js-cookie'
export default {
  inject: ['reload'],
  filters: {
    show(value, n) {
      if (value && value.length > n) {
        value = value.substring(0, n) + '...'
      }
      return value
    }
  },
  data() {
    return {
      pickerOptions: {
        dayNames: ['日', '月', '火', '水', '木', '金', '土'],
      },
      testimageUrl: '',
      tableData: [
      ],
      calendarData: {},
      currentdate: '',
      updateoradd: 0,
      dialogVisible: false,
      imageUrl: '',
      imageUrl2: '',
      files: [],
      form: {
        account_id: '',
        account_img: '',
        account_name: '',
        account_position: '',
        account_user: '',
        account_sex: '',
        account_age: '',
        testimg: ''
      },
      token: '',
    }
  },
  methods: {
    del() {
      // console.log(this.calendarData.calendar_date);
      // console.log(this.calendarData.calendar_content.length);
      if (!this.calendarData.calendar_content) return
      if (this.token === 'admin') {
        delcalendarData({
          params: {
            calendar_date: this.calendarData.calendar_date,
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '削除しました!'
          })
          this.getUserList()
          this.calendarData = {}
          this.updateoradd = 0
        })
      } else {
        delcalendarData1({
          params: {
            calendar_date: this.calendarData.calendar_date,
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '削除しました!'
          })
          this.getUserList()
          this.calendarData = {}
          this.updateoradd = 0
        })
      }


      this.dialogVisible = false
    },
    // 日历start
    messageUp(data) {

      this.currentdate = data.day
      this.calendarData.calendar_date = this.currentdate

      this.tableData.forEach(item => {
        // console.log(item.calendar_date);

        // 如果点击的单元格是已存在的数据就用修改的Axios
        if (item.calendar_date === data.day) {
          // console.log(item);
          let newItem = JSON.parse(JSON.stringify(item))
          // console.log(newItem);
          this.calendarData = newItem
          // 当this.updateoradd = 1时代表这次点击的是存在的数据 就在底下按钮时间用更新
          this.updateoradd = 1
          return

        } else {
          // 如果点击的单元格是没存在的数据就用追加Axios
          // this.updateoradd = 0
        }
      })
      // console.log(this.updateoradd)

      this.dialogVisible = true
    },
    addorup() {
      // 更新已存在数据
      // 等于1的时候是更新方法
      if (this.token === 'admin') {
        if (this.updateoradd === 1) {
          updatcalendarData({
            params: {
              calendar_class: this.calendarData.calendar_class,
              calendar_content: this.calendarData.calendar_content,
              calendar_date: this.calendarData.calendar_date,
              calendar_status: this.calendarData.calendar_status,
            }
          }).then(res => {
            // console.log(res);
            this.$message({
              type: 'success',
              message: '変更しました'
            })
            if (res.data.status == 200) {
              this.getUserList()
              this.calendarData = {}
              // console.log('发送成功')
            } else {
              // console.log('压根没发送成功')
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (this.updateoradd === 0) {
          addcalendarData({
            params: {
              calendar_class: this.calendarData.calendar_class,
              calendar_content: this.calendarData.calendar_content,
              calendar_date: this.calendarData.calendar_date,
              calendar_status: this.calendarData.calendar_status,
            }
          }).then(res => {
            this.getUserList()
            this.calendarData = {}
            if (res.data === `错误：ER_BAD_NULL_ERROR: Column 'calendar_class' cannot be null`) return
            this.$message({
              type: 'success',
              message: '追加しました'
            })
          })
        }
      } else {
        if (this.updateoradd === 1) {
          updatcalendarData1({
            params: {
              calendar_class: this.calendarData.calendar_class,
              calendar_content: this.calendarData.calendar_content,
              calendar_date: this.calendarData.calendar_date,
              calendar_status: this.calendarData.calendar_status,
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: '変更しました'
            })
            if (res.data.status == 200) {
              this.getUserList()
              this.calendarData = {}
              // console.log('发送成功')
            } else {
              // console.log('压根没发送成功')
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (this.updateoradd === 0) {
          // 等于0的时候是提交方法
          addcalendarData1({
            params: {
              calendar_class: this.calendarData.calendar_class,
              calendar_content: this.calendarData.calendar_content,
              calendar_date: this.calendarData.calendar_date,
              calendar_status: this.calendarData.calendar_status,
            }
          }).then(res => {
            this.getUserList()
            this.calendarData = {}
            if (res.data === `错误：ER_BAD_NULL_ERROR: Column 'calendar_class' cannot be null`) return
            this.$message({
              type: 'success',
              message: '追加しました'
            })
            // console.log('添加');
          })
        }
      }


      this.updateoradd = 0
      this.dialogVisible = false
    },
    // 日历end
    handleClose(done) {
      this.calendarData = {}
      this.currentdate = ''
      this.updateoradd = 0
      // this.reload()
      this.dialogVisible = false
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.path;
      this.testimageUrl = URL.createObjectURL(file.raw);
      // console.log(this.testimageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('プロフィール画像のアップロードはJPG形式のみ対応しています');
      }
      if (!isLt2M) {
        this.$message.error('2MB以下の画像をアップロードしてください');
      }
      return isJPG && isLt2M;
    },
    getLocalImg(event, file) {
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

      if (this.files.length > 1) {
        this.files = this.files.splice(1, 1)
      }
    },
    submit() {

      this.$refs.form.validate((valid) => {
        // let test = require(`../server/public/img/${this.form.account_img}.png`)

        // console.log(test);
        // console.log(name);


        if (valid) {
          if (this.files.length !== 0) {
            // 赋值给formData
            let formData = new FormData()
            formData.append('file', this.files[0].raw)
            // POST接口请求
            http.post('http://127.0.0.1:3007/upload', formData)
              .then((res) => {
                this.imageUrl2 = ''
                this.reload()
              })
              .catch((error) => {
                console.log('失敗')
                console.log(error)
              })
          }

          if (this.files.length > 0) {
            const newImageName = this.files[0].name.slice(0, this.files[0].name.length - 4)

            this.form.account_img = newImageName
          }

          // console.log('ok');

          updateAccount({
            params: {
              account_user: this.form.account_user,
              account_name: this.form.account_name,
              account_sex: this.form.account_sex,
              account_age: this.form.account_age,
              account_img: this.form.account_img,
            }
          }).then(res => {
            // console.log(res.data);
            this.$message({
              type: 'success',
              message: '変更しました'
            })
            if (res.data.status == 200) {
              this.getUserList()
              // console.log('发送成功')
            } else {
              // console.log('压根没发送成功')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })

    },
    getUserList() {
      getAccountData().then(({ data }) => {

        if (this.token === 'admin') {
          this.form = data[0]
          // console.log(this.form);
        } else {
          this.form = data[1]
        }
      })


      getcalendarData().then(({ data }) => {
        if (this.token === 'admin') {
          this.tableData = data
        }
      })

      getcalendarData1().then(({ data }) => {
        if (this.token === 'xiaoxiao') {
          this.tableData = data
        }
      })

    },

  },
  created() {
    this.getUserList()

    const token = Cookie.get('token')
    this.token = token

    this.$nextTick(() => {
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      )
      prevBtn.textContent = '先月'

      let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      )
      nextBtn.textContent = '来月'

      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      )
      todayBtn.textContent = '今日'

      let title = document.querySelectorAll(
        ".el-calendar-table> thead >th"
      )
      title[0].textContent = '月曜日'
      title[1].textContent = '火曜日'
      title[2].textContent = '水曜日'
      title[3].textContent = '木曜日'
      title[4].textContent = '金曜日'
      title[5].textContent = '土曜日'
      title[6].textContent = '日曜日'

    })
  }
}
</script>

<style lang="less" scoped>
.profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: 30px;
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
    width: 178px;
    height: 178px;
    // margin-top: 34px;
    // display: block;
  }
}

div ::v-deep th.gutter {
  display: initial;
}

div ::v-deep .el-calendar-day {
  min-height: 110px;
  position: relative;
  z-index: inherit;
}

/deep/.el-calendar__body {
  max-height: 620px;
}

.notweeked {
  padding: 5px;
  text-align: center;
  background-color: #f1f6fb;
  color: #354158;
}

.weeked {
  padding: 5px;
  text-align: center;
  background-color: rgba(255, 0, 0, .1);
}

/deep/.el-textarea__inner {
  height: 200px;
}

.done {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 17px;
  font-weight: 700;
  // color: rgb(79, 146, 41);
}

.content {
  word-break: break-all;

}

.delclass {
  position: absolute;
  left: 20px;
}
</style>