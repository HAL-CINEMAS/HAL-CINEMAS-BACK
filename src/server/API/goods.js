let db = require('../db/index')

exports.get = (req, res) => {
  var sql = 'select * from goods_tb'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send(data)
  })
}

exports.get1 = (req, res) => {
  let { name, page, limit } = req.query
  // console.log(name);
  // console.log(limit);

  limit = limit ? limit : 10;
  page = page ? page : 1;

  if (name) {
    var sql = 'select * from user_tb where name = ?'

    db.query(sql, [req.query.name], (err, data) => {
      res.send({
        data,
        message: 'success'
      })
    })
  } else {
    var sql = 'select * from user_tb order by id desc'
    db.query(sql, (err, data) => {
      if (err) {
        return res.send('error' + err.message)
      }

      let total = data.length;

      let n = (page - 1) * limit;

      sql += ` limit ${n}, ${limit}`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        res.send({
          data,
          total,
        });
      });
    })
  }

}

exports.update = (req, res) => {
  var sql = 'update goods_tb set goods_amount = ? , todayBuy = ?, monthBuy = ?, yearBuy = ?, totalBuy = ? where goods_id = ?'
  db.query(sql, [req.query.goods_amount, req.query.todayBuy, req.query.monthBuy, req.query.yearBuy, req.query.totalBuy, req.query.goods_id], (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.update1 = (req, res) => {
  // console.log(req.query.goods_namej);
  var sql = 'update goods_tb set goods_namej = ?,goods_price = ?,goods_amount = ? where goods_id = ?'
  db.query(sql, [req.query.goods_namej, req.query.goods_price, req.query.goods_amount, req.query.goods_id], (err, data) => {
    if (err) {
      return res.send('连接出问题拉')
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.update2 = (req, res) => {

  var sql = 'update goods_tb set goods_name = ? where goods_id = ?'
  db.query(sql, [req.query.goods_name, req.query.goods_id], (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.add = (req, res) => {
  // console.log(req.query.id);
  // console.log(req.query.name);
  var sql = 'insert into user_tb (id,name,age,birth,sex,addr) values (?,?,?,?,?,?)'
  db.query(sql, [req.query.id, req.query.name, req.query.age, req.query.birth, req.query.sex, req.query.addr], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: 'success'
      })
    } else {
      res.send({
        status: 202,
        message: 'error'
      })
    }
  })
}

exports.update3 = (req, res) => {
  // console.log(req.query.id);
  // console.log(req.query.name);
  var sql = 'update user_tb set name = ?,age = ?,birth = ?,sex = ?,addr = ? where id = ?'
  db.query(sql, [req.query.name, req.query.age, req.query.birth, req.query.sex, req.query.addr, req.query.id], (err, data) => {
    if (err) {
      return res.send('连接出问题拉')
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.del = (req, res) => {        //通过id删除数据
  var sql = 'delete from user_tb where id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        status: 202,
        message: '删除失败'
      })
    }
  })
}

exports.getaccount = (req, res) => {
  var sql = 'select * from accounts_tb'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send(data)
  })
}

exports.updateaccount = (req, res) => {
  // console.log(req.query.account_user);
  // console.log(req.query.account_name);
  var sql = 'update accounts_tb set account_name = ?,account_sex = ?,account_age = ?,account_img = ? where account_user = ?'
  db.query(sql, [req.query.account_name, req.query.account_sex, req.query.account_age, req.query.account_img, req.query.account_user], (err, data) => {
    if (err) {
      return res.send('连接出问题拉')
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}


exports.getcalendarData = (req, res) => {
  var sql = 'select * from admin_tb'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send(data)
  })
}

exports.getcalendarData1 = (req, res) => {
  var sql = 'select * from unadmin_tb'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send(data)
  })
}

exports.updatcalendarData = (req, res) => {
  // console.log(req.query.account_user);
  // console.log(req.query.account_name);
  var sql = 'update admin_tb set calendar_class = ?,calendar_content = ? ,calendar_status = ? where calendar_date = ?'
  db.query(sql, [req.query.calendar_class, req.query.calendar_content, req.query.calendar_status, req.query.calendar_date], (err, data) => {
    if (err) {
      return res.send('连接出问题拉')
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.updatcalendarData1 = (req, res) => {
  // console.log(req.query.account_user);
  // console.log(req.query.account_name);
  var sql = 'update unadmin_tb set calendar_class = ?,calendar_content = ? ,calendar_status = ? where calendar_date = ?'
  db.query(sql, [req.query.calendar_class, req.query.calendar_content, req.query.calendar_status, req.query.calendar_date], (err, data) => {
    if (err) {
      return res.send('连接出问题拉')
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}

exports.addcalendarData = (req, res) => {
  // console.log(req.query.id);
  // console.log(req.query.name);
  var sql = 'insert into admin_tb (calendar_id,calendar_date,calendar_class,calendar_content,calendar_status) values (?,?,?,?,?)'
  db.query(sql, [req.query.calendar_id, req.query.calendar_date, req.query.calendar_class, req.query.calendar_content, req.query.calendar_status], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: 'success'
      })
    } else {
      res.send({
        status: 202,
        message: 'error'
      })
    }
  })
}

exports.addcalendarData1 = (req, res) => {
  // console.log(req.query.id);
  // console.log(req.query.name);
  var sql = 'insert into unadmin_tb (calendar_id,calendar_date,calendar_class,calendar_content,calendar_status) values (?,?,?,?,?)'
  db.query(sql, [req.query.calendar_id, req.query.calendar_date, req.query.calendar_class, req.query.calendar_content, req.query.calendar_status], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: 'success'
      })
    } else {
      res.send({
        status: 202,
        message: 'error'
      })
    }
  })
}

exports.delcalendarData = (req, res) => {        //通过id删除数据
  var sql = 'delete from admin_tb where calendar_date = ?'
  db.query(sql, [req.query.calendar_date], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        status: 202,
        message: '删除失败'
      })
    }
  })
}


exports.delcalendarData1 = (req, res) => {        //通过id删除数据
  var sql = 'delete from unadmin_tb where calendar_date = ?'
  db.query(sql, [req.query.calendar_date], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        status: 202,
        message: '删除失败'
      })
    }
  })
}

exports.test = (req, res) => {
  var sql = 'update goods_tb set goods_amount = ?'
  db.query(sql, [req.query.goods_amount], (err, data) => {
    if (err) {
      return res.send('error' + err.message)
    }
    res.send({
      status: 200,
      message: 'success'
    })
  })
}
