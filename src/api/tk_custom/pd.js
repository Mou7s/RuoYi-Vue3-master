import request from "@/utils/request";

// 查询盘点列表
export function listPd(query) {
  return request({
    url: "/tk_custom/pd/list",
    method: "get",
    params: query,
  });
}

// 查询盘点详细
export function getPd(id) {
  return request({
    url: "/tk_custom/pd/" + id,
    method: "get",
  });
}
// 查询盘点详细
export function getPdFromKingdee(id) {
  return request({
    url: "/tk_custom/pd/kingdee/" + id,
    method: "get",
  });
}
// 新增盘点
export function addPd(data) {
  return request({
    url: "/tk_custom/pd",
    method: "post",
    data: data,
  });
}

// 修改盘点
export function updatePd(data) {
  return request({
    url: "/tk_custom/pd",
    method: "put",
    data: data,
  });
}

// 删除盘点
export function delPd(id) {
  return request({
    url: "/tk_custom/pd/" + id,
    method: "delete",
  });
}
