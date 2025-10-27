import request from '@/utils/request'

// 查询盘点_固定资产列表
export function selectFromKingdee(billno) {
    return request({
        url: '/tk_custom/gdzc/selectFromKingdee/'+billno,
        method: 'get'
    })
}
// 查询盘点_固定资产列表
export function listPd_gdzc(query) {
  return request({
    url: '/tk_custom/gdzc/list',
    method: 'get',
    params: query
  })
}
// 查询盘点_固定资产详细
export function getPd_gdzc(id) {
  return request({
    url: '/tk_custom/gdzc/' + id,
    method: 'get'
  })
}

// 新增盘点_固定资产
export function addPd_gdzc(data) {
  return request({
    url: '/tk_custom/gdzc',
    method: 'post',
    data: data
  })
}

// 修改盘点_固定资产
export function updatePd_gdzc(data) {
  return request({
    url: '/tk_custom/gdzc',
    method: 'put',
    data: data
  })
}

// 删除盘点_固定资产
export function delPd_gdzc(id) {
  return request({
    url: '/tk_custom/gdzc/' + id,
    method: 'delete'
  })
}
