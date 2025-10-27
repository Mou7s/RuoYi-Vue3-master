import request from '@/utils/request'

// 更新出厂时间
export function updateOutTime(spNo) {
    return request({
        url: '/tk_custom/WXApprove/updateOutTime/' + spNo,
        method: 'get'
    })
}
// 更新出厂时间
export function updateOutTime1(params) {
    return request({
        url: '/tk_custom/WXApprove/updateOutTime1',
        method: 'post',
        data:params
    })
}
// 更新返厂时间
export function updateBackTime(spNo) {
    return request({
        url: '/tk_custom/WXApprove/updateBackTime/' + spNo,
        method: 'get'
    })
}
// 查询微信审批列表
export function listWXApprove(query) {
  return request({
    url: '/tk_custom/WXApprove/list',
    method: 'get',
    params: query
  })
}
export function queryBA() {
    return request({
        url: '/tk_custom/WXApprove/queryBA',
        method: 'get'
    })
}
export function getCardNumber() {
    return request({
        url: '/tk_custom/WXApprove/getCardNumber',
        method: 'get'
    })
}
// 查询微信审批列表
export function listWXApproveForOut(query) {
    return request({
        url: '/tk_custom/WXApprove/listForOut',
        method: 'get',
        params: query
    })
}
// 查询微信审批列表
export function listWXApproveForBack(query) {
    return request({
        url: '/tk_custom/WXApprove/listForBack',
        method: 'get',
        params: query
    })
}
// 查询微信审批列表
export function listWXApproveForOut1(query) {
    return request({
        url: '/tk_custom/WXApprove/listForOut1',
        method: 'get',
        params: query
    })
}
// 查询微信审批列表
export function listWXApproveForBack1(query) {
    return request({
        url: '/tk_custom/WXApprove/listForBack1',
        method: 'get',
        params: query
    })
}
// 查询微信审批详细
export function getWXApprove(spNo) {
  return request({
    url: '/tk_custom/WXApprove/' + spNo,
    method: 'get'
  })
}

// 新增微信审批
export function addWXApprove(data) {
  return request({
    url: '/tk_custom/WXApprove',
    method: 'post',
    data: data
  })
}

// 修改微信审批
export function updateWXApprove(data) {
  return request({
    url: '/tk_custom/WXApprove',
    method: 'put',
    data: data
  })
}

// 删除微信审批
export function delWXApprove(spNo) {
  return request({
    url: '/tk_custom/WXApprove/' + spNo,
    method: 'delete'
  })
}
