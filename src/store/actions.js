import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER
} from './mutation-types'

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser
} from '../api'


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
  },
//  异步获得用户信息
  async getUser({commit}){
    const result = await reqUser();
    //如果请求到了数据，则先获得user数据，然后再提交user
    if(result.code===0){
      const user = result.data;
      commit(RECEIVE_USER,{user})

    }
  },
//  保存user的同步action
  async saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },

}
