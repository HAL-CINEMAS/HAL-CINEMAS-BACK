import http from '../utils/request1'

export const getDate1 = () => {
  return http.get('/goods')
}

export const update = (params) => {
  return http.get('/update', params)
}

export const update1 = (params) => {
  return http.get('/update1', params)
}

export const update2 = (params) => {
  return http.get('/update2', params)
}

export const test = (params) => {
  return http.get('/test', params)
}

// 用户部分

export const getUserDate = (params) => {
  return http.get('/users', params)
}

export const addUserData = (params) => {
  return http.get('/add', params)
}

export const updateUser = (params) => {
  return http.get('/update3', params)
}

export const delUserData = (params) => {
  return http.get('/del', params)
}

// 管理員部分

export const getAccountData = (params) => {
  return http.get('/account', params)
}

export const updateAccount = (params) => {
  return http.get('/updateAccount', params)
}

export const getcalendarData = (params) => {
  return http.get('/calendarData', params)
}

export const getcalendarData1 = (params) => {
  return http.get('/calendarData1', params)
}

export const updatcalendarData = (params) => {
  return http.get('/updatcalendarData', params)
}

export const updatcalendarData1 = (params) => {
  return http.get('/updatcalendarData1', params)
}

export const addcalendarData = (params) => {
  return http.get('/addcalendarData', params)
}

export const addcalendarData1 = (params) => {
  return http.get('/addcalendarData1', params)
}

export const delcalendarData = (params) => {
  return http.get('/delcalendarData', params)
}

export const delcalendarData1 = (params) => {
  return http.get('/delcalendarData1', params)
}
