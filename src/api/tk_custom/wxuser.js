import request from '@/utils/request'

// 查询企业微信成员表列表
export function listWxuser(query) {
  return request({
    url: '/tk_custom/wxuser/list',
    method: 'get',
    params: query
  })
}

// 查询企业微信成员表详细
export function getWxuser(userid) {
  return request({
    url: '/tk_custom/wxuser/' + userid,
    method: 'get'
  })
}

// 新增企业微信成员表
export function addWxuser(data) {
  return request({
    url: '/tk_custom/wxuser',
    method: 'post',
    data: data
  })
}

// 修改企业微信成员表
export function updateWxuser(data) {
  return request({
    url: '/tk_custom/wxuser',
    method: 'put',
    data: data
  })
}

// 删除企业微信成员表
export function delWxuser(userid) {
  return request({
    url: '/tk_custom/wxuser/' + userid,
    method: 'delete'
  })
}
