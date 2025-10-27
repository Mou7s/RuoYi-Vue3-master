import request from '@/utils/request'

// 查询焊线工序检测记录列表
export function listGxjc(query) {
  return request({
    url: '/tk_custom/gxjc/list',
    method: 'get',
    params: query
  })
}

// 查询焊线工序检测记录详细
export function getGxjc(id) {
  return request({
    url: '/tk_custom/gxjc/' + id,
    method: 'get'
  })
}

// 新增焊线工序检测记录
export function addGxjc(data) {
  return request({
    url: '/tk_custom/gxjc',
    method: 'post',
    data: data
  })
}

// 修改焊线工序检测记录
export function updateGxjc(data) {
  return request({
    url: '/tk_custom/gxjc',
    method: 'put',
    data: data
  })
}

// 删除焊线工序检测记录
export function delGxjc(id) {
  return request({
    url: '/tk_custom/gxjc/' + id,
    method: 'delete'
  })
}
//查询流程单信息
export function getFlowBillInfo(flowno) {
    return request({
        url: '/tk_custom/gxjc/getFlowBillInfo/' + flowno,
        method: 'get'
    })
}
// 查询弹坑图片列表
export function getHandlerList(query) {
    return request({
        url: '/tk_custom/gxjc/getHandlerList',
        method: 'get',
        params: query
    })
}
// 查询弹坑图片列表
export function getMechineList(query) {
    return request({
        url: '/tk_custom/gxjc/getMechineList',
        method: 'get',
        params: query
    })
}
