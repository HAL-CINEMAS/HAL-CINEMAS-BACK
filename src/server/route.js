let express = require('express')
let router = express.Router()
let goods = require('./API/goods')
let multer = require('multer')
let fs = require('fs')
// let upload = require('./API/picture')

router.get('/goods', goods.get)
router.get('/update', goods.update)
router.get('/update1', goods.update1)
router.get('/update2', goods.update2)
router.get('/test', goods.test)
router.post('/upload', multer({

  dest: 'public/img'
}).array('file', 1), function (req, res, next) {
  let files = req.files;
  // console.log(files);
  let file = files[0];
  let fileInfo = {};
  let path = 'public/img/' + file.originalname;
  fs.renameSync('./public/img/' + file.filename, path);

  fileInfo.type = file.mimetype;
  fileInfo.name = file.originalname;
  fileInfo.size = file.size;
  fileInfo.path = path;
  res.json({
    code: 0,
    msg: 'OK',
    data: fileInfo
  })
})

// 用户部分
router.get('/users', goods.get1)
router.get('/add', goods.add)
router.get('/update3', goods.update3)
router.get('/del', goods.del)

// 管理員部分

router.get('/account', goods.getaccount)
router.get('/updateAccount', goods.updateaccount)
router.get('/calendarData', goods.getcalendarData)
router.get('/calendarData1', goods.getcalendarData1)
router.get('/updatcalendarData', goods.updatcalendarData)
router.get('/updatcalendarData1', goods.updatcalendarData1)
router.get('/addcalendarData', goods.addcalendarData)
router.get('/addcalendarData1', goods.addcalendarData1)
router.get('/delcalendarData', goods.delcalendarData)
router.get('/delcalendarData1', goods.delcalendarData1)

module.exports = router
