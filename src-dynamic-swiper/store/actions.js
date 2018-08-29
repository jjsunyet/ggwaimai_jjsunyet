import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  // RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {reqAddress,reqCategorys,reqShops} from '../api'

export default {
  async getAddress({commit,state}){
  //  发送异步ajax请求
    const {latitude,longitude} = state;
    const geohash = `${latitude},${longitude}`;
    const result = await reqAddress(geohash);
  //  获取到数据后提交给mutation
    const address = result.data;
    console.log(address);
    commit(RECEIVE_ADDRESS,{address})
  },
//  异步获取食品分类列表
  async getCategorys({commit}){
    const result = await reqCategorys();
    const categorys = result.data;
    commit(RECEIVE_CATEGORYS,{categorys});
  },
//  异步获取商家列表
  async getShops({commit,state}){
    const {latitude, longitude} = state
    const result = await reqShops(longitude,latitude);
    const shops = result.data;
    commit(RECEIVE_SHOPS,{shops});
  }
}
