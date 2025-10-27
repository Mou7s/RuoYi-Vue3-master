import request from '@/utils/request'

// 查询销售出库单
export function list(id) {
    return request({
        url: '/wms/ck/list/'+id,
        method: 'get'
    })
}


// 审核销售出库单
export function audit(id) {
    return request({
        url: '/wms/ck/audit_out/'+id,
        method: 'get'
    })
}