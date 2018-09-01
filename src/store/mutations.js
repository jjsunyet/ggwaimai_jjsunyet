import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
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
}

