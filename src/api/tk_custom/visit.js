import request from '@/utils/request'

// 查询来访登记列表
export function listVisit(query) {
  return request({
    url: '/tk_custom/visit/list',
    method: 'get',
    params: query
  })
}

// 查询来访登记列表
export function lookScreenList(query) {
    return request({
        url: '/tk_custom/visit/lookScreen',
        method: 'get',
        params: query
    })
}
export function leaveFactory(update) {
    return request({
        url: '/tk_custom/visit/updateOutTime',
        method: 'post',
        params: update
    })
}
// 查询来访登记详细
export function getVisit(id) {
  return request({
    url: '/tk_custom/visit/' + id,
    method: 'get'
  })
}
// 查询来访登记详细
export function getVisitByTelephone(vTelephone) {
    return request({
        url: '/tk_custom/visit/selectByPhone/' + vTelephone,
        method: 'get'
    })
}
// 新增来访登记
export function addVisit(data) {
  return request({
    url: '/tk_custom/visit',
    method: 'post',
    data: data
  })
}
// 扫码新增
export function scanAddVisit(data) {
    return request({
        url: '/tk_custom/visit/scanAdd',
        method: 'post',
        data: data
    })
}
// 扫码新增
export function simpleAddVisit(data) {
    return request({
        url: '/tk_custom/visit/simpleAdd',
        method: 'post',
        data: data
    })
}
// 修改来访登记
export function updateVisit(data) {
  return request({
    url: '/tk_custom/visit',
    method: 'put',
    data: data
  })
}
// 审核来访登记
export function approveVisit(id) {
    return request({
        url: '/tk_custom/visit/approve/'+id,
        method: 'get'
    })
}
// 删除来访登记
export function delVisit(id) {
  return request({
    url: '/tk_custom/visit/' + id,
    method: 'delete'
  })
}
// 同步企业微信员工信息
export function syncEmploeeWX() {
    return request({
        url: '/tk_custom/WX/syncEmploee',
        method: 'get'
    })
}
// 同步企业微信部门信息
export function syncDeptWX() {
    return request({
        url: '/tk_custom/WX/syncDept',
        method: 'get'
    })
}
