import request from '@/utils/request'

// 查询发送到企微的消息队列列表
export function listMsgtowx(query) {
  return request({
    url: '/tk_custom/msgtowx/list',
    method: 'get',
    params: query
  })
}

// 查询发送到企微的消息队列详细
export function getMsgtowx(id) {
  return request({
    url: '/tk_custom/msgtowx/' + id,
    method: 'get'
  })
}

// 新增发送到企微的消息队列
export function addMsgtowx(data) {
  return request({
    url: '/tk_custom/msgtowx',
    method: 'post',
    data: data
  })
}

// 修改发送到企微的消息队列
export function updateMsgtowx(data) {
  return request({
    url: '/tk_custom/msgtowx',
    method: 'put',
    data: data
  })
}

// 删除发送到企微的消息队列
export function delMsgtowx(id) {
  return request({
    url: '/tk_custom/msgtowx/' + id,
    method: 'delete'
  })
}
