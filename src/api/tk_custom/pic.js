import request from '@/utils/request'

// 查询弹坑图片列表
export function listPic(query) {
  return request({
    url: '/tk_custom/pic/list',
    method: 'get',
    params: query
  })
}
// 查询弹坑图片列表
export function getHandlerList(query) {
    return request({
        url: '/tk_custom/pic/getHandlerList',
        method: 'get',
        params: query
    })
}
// 查询弹坑图片列表
export function getMechineList(query) {
    return request({
        url: '/tk_custom/pic/getMechineList',
        method: 'get',
        params: query
    })
}
// 删除弹坑图片
export function delPicFile(data) {
    return request({
        url: '/tk_custom/pic/deldkPic',
        method: 'post',
        data: data
    })
}
//查询流程单信息
export function getFlowBillInfo(flowno) {
    return request({
        url: '/tk_custom/pic/getFlowBillInfo/' + flowno,
        method: 'get'
    })
}
export function uploadImages(data) {
    return request({
        url: '/tk_custom/pic/dkPic',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data
    })
}
// 查询弹坑图片详细
export function getPic(id) {
  return request({
    url: '/tk_custom/pic/' + id,
    method: 'get'
  })
}

// 新增弹坑图片
export function addPic(data) {
  return request({
    url: '/tk_custom/pic',
    method: 'post',
    data: data
  })
}

// 修改弹坑图片
export function updatePic(data) {
  return request({
    url: '/tk_custom/pic',
    method: 'put',
    data: data
  })
}

// 删除弹坑图片
export function delPic(id) {
  return request({
    url: '/tk_custom/pic/' + id,
    method: 'delete'
  })
}
