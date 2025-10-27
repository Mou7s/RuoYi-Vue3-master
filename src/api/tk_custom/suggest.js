import request from '@/utils/request'

// 查询意见/建议列表
export function listSuggest(query) {
  return request({
    url: '/tk_custom/suggest/list',
    method: 'get',
    params: query
  })
}

// 查询意见/建议详细
export function getSuggest(id) {
  return request({
    url: '/tk_custom/suggest/' + id,
    method: 'get'
  })
}

// 新增意见/建议
export function addSuggest(data) {
  return request({
    url: '/tk_custom/suggest',
    method: 'post',
    data: data
  })
}

// 修改意见/建议
export function updateSuggest(data) {
  return request({
    url: '/tk_custom/suggest',
    method: 'put',
    data: data
  })
}

// 删除意见/建议
export function delSuggest(id) {
  return request({
    url: '/tk_custom/suggest/' + id,
    method: 'delete'
  })
}
