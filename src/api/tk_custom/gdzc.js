import request from '@/utils/request'

// 查询固定资产盘点列表
export function listGdzc(query) {
  return request({
    url: '/tk_custom/gdzc/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产盘点详细
export function getGdzc(id) {
  return request({
    url: '/tk_custom/gdzc/' + id,
    method: 'get'
  })
}

// 新增固定资产盘点
export function addGdzc(data) {
  return request({
    url: '/tk_custom/gdzc',
    method: 'post',
    data: data
  })
}

// 修改固定资产盘点
export function updateGdzc(data) {
  return request({
    url: '/tk_custom/gdzc',
    method: 'put',
    data: data
  })
}

// 删除固定资产盘点
export function delGdzc(id) {
  return request({
    url: '/tk_custom/gdzc/' + id,
    method: 'delete'
  })
}
