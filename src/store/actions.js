import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
<<<<<<< HEAD
  RECEIVE_USER
=======
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc
} from './mutation-types'

import {
  reqAddress,
  reqCategorys,
  reqShops,
<<<<<<< HEAD
  reqUser
} from '../api'

=======
  reqUser,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
  } from '../api'
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc

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
<<<<<<< HEAD
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

=======
//  同步保存用户信息
    saveUser({commit},user){
    commit(RECEIVE_USER,{user});
  },

//  异步获取用户信息
  async getUser({commit}){
    const result = await reqUser();
    if(result.code===0){
      const user = result.data;
      commit(RECEIVE_USER,{user});
    }
  },

//  退出登录
  async logout({commit}){
   const result = await reqLogout();
   if(result.code === 0){
     commit(RESET_USER)
   }
  },
  async getShopGoods({commit},cb){
    const result = await reqShopGoods();
    if(result.code === 0){
      const goods = result.data;
      commit(RECEIVE_GOODS,{goods});
      cb &&  cb();
    }
  },
  async getShopRatings({commit},cb){
    const result = await reqShopRatings();
    if(result.code === 0){
      const ratings = result.data;
      info.score = 3.5
      commit(RECEIVE_RATINGS,{ratings})
      cb &&  cb();
    }
  },
  async getShopInfo({commit},cb){
    const result = await reqShopInfo();
    if(result === 0){
      const info  = result.data;
      commit(RECEIVE_INFO,{info})
      cb &&  cb();
    }
  }
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc
}

