import request from '@/utils/request'

// 查询金蝶库存查询列表
export function listKucun(query) {
  return request({
    url: '/tk_custom/kucun/list',
    method: 'get',
    params: query
  })
}
// 查询金蝶库存查询列表
export function listKucun_sum(query) {
    return request({
        url: '/tk_custom/kucun/list_sum',
        method: 'get',
        params: query
    })
}
// 查询金蝶库存总计
export function list_sum_total(query) {
    return request({
        url: '/tk_custom/kucun/list_sum_total',
        method: 'get',
        params: query
    })
}
// 查询金蝶库存查询详细
export function getKucun(id) {
  return request({
    url: '/tk_custom/kucun/' + id,
    method: 'get'
  })
}

// 新增金蝶库存查询
export function addKucun(data) {
  return request({
    url: '/tk_custom/kucun',
    method: 'post',
    data: data
  })
}

// 修改金蝶库存查询
export function updateKucun(data) {
  return request({
    url: '/tk_custom/kucun',
    method: 'put',
    data: data
  })
}

// 删除金蝶库存查询
export function delKucun(id) {
  return request({
    url: '/tk_custom/kucun/' + id,
    method: 'delete'
  })
}
