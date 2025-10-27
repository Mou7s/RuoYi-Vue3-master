import request from '@/utils/request'

// 查询销售出库单
export function list(id) {
    return request({
        url: '/wms/ck/queryKuCun/'+id,
        method: 'get'
    })
}
export function queryStock() {
    return request({
        url: '/wms/ck/getStock',
        method: 'get'
    })
}
export function queryStockLoc(id) {
    return request({
        url: '/wms/ck/getStockLoc/'+id,
        method: 'get'
    })
}
export function save(data) {
    return request({
        url: '/wms/ck/save',
        method: 'put',
        data: data
    })
}
