import httpService from "./http";

// 当前城市
export const currentCity = httpService.getHttp("/v1/cities", { type: "guess" });
// 热门城市
export const hostCity = httpService.getHttp("/v1/cities", { type: "hot" });
// 所以的城市
export const groupCity = httpService.getHttp("/v1/cities", { type: "group" });
// 选择的城市
export const currentcity = id => httpService.getHttp("/v1/cities/" + id);
//搜索地址
export const searchAddress = params => httpService.getHttp("/v1/pois", params);
