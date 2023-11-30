import Mock from 'mockjs'
import home from './mockServerData/home.js'
import user from './mockServerData/user.js'
import permission from './mockServerData/permission.js'

Mock.mock('/api/home/getData', home.getData())

Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)