/*
* 一个包含了若干个请求数据的方法
* */
import ajax from './ajax'

const BASE = '/api';

//1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress =(geohash)=>ajax(`${BASE}/position/${geohash}`);
// 2、获取食品分类列表
export const reqCategorys =()=>ajax(BASE + '/index_category');
// 3. 根据经纬度获取商铺列表
export const reqShops =(longitude,latitude)=>ajax(BASE + '/shops',{latitude,longitude});
// 4.根据经纬度和关键字搜索商铺列表
export const searchShops =(geohash,keyword)=>ajax(BASE + '/search_shops',{geohash,keyword})
// 5.获取手机验证码
<<<<<<< HEAD
export const reqSendCode = (phone)=>ajax(BASE+'/api/sendcode',{phone});
//6.手机短信验证登录
export const reqMsgLogin = (phone,code)=>ajax(BASE + '/api/login_sms',{phone,code},'POST')
//7.账号密码登录
export const reqPwdLogin =({name,pwd,captcha})=>ajax(BASE+'/api/login_pwd',{name,pwd,captcha},'POST');
//8.获取用户信息
export const reqUser = ()=>ajax(BASE+'api/userInfo');
=======
export const reqSendCode = (phone)=>ajax(BASE+'/sendcode',{phone});
//6.手机短信验证登录
export const reqMsgLogin = (phone,code)=>ajax(BASE + '/login_sms',{phone,code},'POST')
//7.账号密码登录
export const reqPwdLogin =({name,pwd,captcha})=>ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST');
//8.获取用户信息
export const reqUser = ()=>ajax(BASE+'/userinfo');
//9异步登出
export const reqLogout =()=>ajax(BASE+'/logout');
//请求商店商品分类列表信息
export const reqShopGoods = ()=>ajax('/goods');
//请求店铺评论信息
export const reqShopRatings = ()=>ajax('/ratings');
//请求店铺详情信息
export const reqShopInfo = ()=>ajax('/info')
>>>>>>> e84e946bf9c5c66cb848a7c6000f8b37bc18f0cc
