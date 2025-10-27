import request from '@/utils/request'

// 查询盘点_仓库列表
export function listPd_ck(query) {
  return request({
    url: '/tk_custom/pd_ck/list',
    method: 'get',
    params: query
  })
}

// 查询盘点_仓库详细
export function getPd_ck(id) {
  return request({
    url: '/tk_custom/pd_ck/' + id,
    method: 'get'
  })
}

// 新增盘点_仓库
export function addPd_ck(data) {
  return request({
    url: '/tk_custom/pd_ck',
    method: 'post',
    data: data
  })
}

// 修改盘点_仓库
export function updatePd_ck(data) {
  return request({
    url: '/tk_custom/pd_ck',
    method: 'put',
    data: data
  })
}

// 删除盘点_仓库
export function delPd_ck(id) {
  return request({
    url: '/tk_custom/pd_ck/' + id,
    method: 'delete'
  })
}
