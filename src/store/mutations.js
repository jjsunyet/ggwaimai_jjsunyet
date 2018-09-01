import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
<<<<<<< HEAD
  RECEIVE_USER
  // RECEIVE_SEARCH_SHOPS
=======
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS](state,{address}){
  state.address = address;
    },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops= shops;
  },
  [RECEIVE_USER](state,{user}){
    state.user = user;
<<<<<<< HEAD
  }

=======
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.goods = ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.goods = info;
  },
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc
}

