import request from '@/utils/request'

// 查询扫码登记（车间）列表
export function listWorkshop(query) {
  return request({
    url: '/tk_custom/workshop/list',
    method: 'get',
    params: query
  })
}

// 查询扫码登记（车间）详细
export function getWorkshop(id) {
  return request({
    url: '/tk_custom/workshop/' + id,
    method: 'get'
  })
}

// 新增扫码登记（车间）
export function addWorkshop(data) {
  return request({
    url: '/tk_custom/workshop',
    method: 'post',
    data: data
  })
}

// 修改扫码登记（车间）
export function updateWorkshop(data) {
  return request({
    url: '/tk_custom/workshop',
    method: 'put',
    data: data
  })
}

// 删除扫码登记（车间）
export function delWorkshop(id) {
  return request({
    url: '/tk_custom/workshop/' + id,
    method: 'delete'
  })
}

// 新增扫码登记（车间）
export function scanWorkshop(data) {
    return request({
        url: '/tk_custom/workshop/scanAdd',
        method: 'post',
        data: data
    })
}