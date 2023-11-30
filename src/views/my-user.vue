<template>
  <div class="manage">
    <!-- 点击按钮区域 -->
    <div class="manage-header">
      <el-button type="primary" @click="add">+ 追加</el-button>
      <el-form :inline="true" :model="user_search" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="user_search.name" placeholder="氏名" @change="resetUser"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">検索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 弹窗区域 -->
    <el-dialog title="会員追加" :visible.sync="dialogVisible" :before-close="handleClose" width="35%">
      <el-form :inline="true" ref="form" :rules="rules" :model="form" class="demo-form-inline">
        <el-form-item label="id" prop="id" style="display:none">
          <el-input v-model="form.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="氏名" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="年齢" prop="age">
          <el-input v-model="form.age" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生年月日" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="" value-format="yyyy/MM/dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="住所" prop="addr">
          <el-input v-model="form.addr" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">キャンセル</el-button>
        <el-button type="primary" @click="submit">確定</el-button>
      </span>
    </el-dialog>
    <!-- 表格区域 -->
    <div class="tab-content">
      <el-table stripe :data="tableData" style="width: 100%" height="100%" empty-text="一致する氏名が見つかりませんでした">
        <el-table-column prop="name" label="氏名">
        </el-table-column>
        <el-table-column prop="age" label="年齢">
        </el-table-column>
        <el-table-column prop="sex" label="性別">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="birth" label="生年月日">
        </el-table-column>
        <el-table-column prop="addr" label="住所">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">編集</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">削除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange"
          :page-size="this.limit">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { getUserDate, addUserData, updateUser, delUserData } from '../api/index1.js'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
          { required: true, message: '名前を入力してください' }
        ],
        age: [
          { required: true, message: '年齢を入力してください' }
        ],
        sex: [
          { required: true, message: '性別を入力してください' }
        ],
        birth: [
          { required: true, message: '生年月日を入力してください' }
        ],
        addr: [
          { required: true, message: '住所を入力してください' }
        ],
      },
      tableData: [],
      modulButton: 0,
      total: 0,
      page: 1,
      limit: 14,
      user_search: {
        name: ''
      }
    }
  },
  methods: {
    resetUser() {
      this.getUserList()
    },
    submit() {
      // console.log(this.$refs.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modulButton === 0) {
            addUserData({
              params: {
                name: this.form.name,
                age: this.form.age,
                birth: this.form.birth,
                sex: this.form.sex,
                addr: this.form.addr,
              }
            }).then(res => {
              // console.log(res.data);
              this.getUserList()
              this.$message({
                type: 'success',
                message: '追加しました'
              })
              // console.log('添加');
            })
          } else {
            updateUser({
              params: {
                id: this.form.id,
                name: this.form.name,
                age: this.form.age,
                birth: this.form.birth,
                sex: this.form.sex,
                addr: this.form.addr,
              }
            }).then(() => {
              this.getUserList()
              this.$message({
                type: 'success',
                message: '変更しました'
              })
            })
          }

          this.dialogVisible = false
          this.$refs.form.resetFields()
          this.form = {}
        }
      })
    },
    close() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.form = {}
    },
    handleClose() {
      this.close()
    },
    handleEdit(e) {
      this.form = JSON.parse(JSON.stringify(e))
      this.modulButton = 1
      this.dialogVisible = true
    },
    add() {
      this.dialogVisible = true
      this.modulButton = 0
    },
    handleDelete(e) {
      // console.log(e);
      this.$confirm('確認ボタンを押すとデータは完全に削除されます、間違いがないかご確認ください', '警告', {
        confirmButtonText: '確認',
        cancelButtonText: 'キャンセル',
        type: 'warning'
      }).then(() => {
        delUserData({
          params: {
            id: e.id
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '削除しました!'
          })
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'キャンセルしました'
        })
      })

    },
    handleAdd() {
      this.modulButton = 0
      this.dialogVisible = true
    }
    ,
    getUserList() {
      // getUser({ params: { ...this.user_search, ...this.pageData } }).then(({ data }) => {
      //   console.log(data);
      //   this.tableData = data.list
      //   this.total = data.count || 0
      // })


      let page = this.page
      let limit = this.limit
      let name = this.user_search.name

      getUserDate({
        params: { name, page, limit }
      }).then(({ data }) => {
        // console.log(data);
        // console.log(data.data);
        this.tableData = data.data
        this.total = data.total || 0
      })

      // this.$refs.form.resetFields()

      // this.dialogVisible = true
    },
    pageChange(e) {
      this.page = e
      // console.log(this.page);
      this.getUserList()
    },
    onSubmit() {
      this.getUserList()
      this.form = {}
    }
  },
  created() {
    this.getUserList()


  },

}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tab-content {
    height: calc(100% - 32px);
    position: relative;

    .pager {
      position: absolute;
      bottom: -40px;
      right: 20px;
    }
  }
}
</style>