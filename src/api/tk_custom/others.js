import request from '@/utils/request'


export function exportExcel(billnos) {
    return request({
        url: '/kingdee/exportWFData/'+billnos,
        method: 'get'
    })
}
