import request from '@/utils/request'


export function updateTimeOfGXLL(data) {
    return request({
        url: '/kingdee/updateTimeOfGXLL',
        method: 'post',
        data: data
    })
}
export function handleCBData() {
    return request({
        url: '/kingdee/handleCBData',
        method: 'post'
    })
}
export function writeToMO() {
    return request({
        url: '/kingdee/writeToMO',
        method: 'post'
    })
}
export function buildIndexOfKingdee() {
    return request({
        url: '/kingdee/buildIndexOfKingdee',
        method: 'post'
    })
}
export function deletePZ(data) {
    return request({
        url: '/kingdee/deletePZ',
        method: 'post',
        data: data
    })
}