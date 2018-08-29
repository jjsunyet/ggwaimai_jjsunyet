/*
* 暴露一个封装了发送Ajax请求的函数,函数的返回值是promise
* */
import axios from 'axios';

export default function ajax(url,data={},type='GET') {
  //包一层promise函数是为了直接获取result,而不必再通过response.data转存
  return new Promise(function (resolve,reject) {
    let promise;

    //开始执行异步请求
    if(type==='GET'){
    //  data数据携带在param参数中
    //  1.初始化param串
      let paramStr = '';
      //Object.keys()相当于获得对象下面的所有的属性，被获取的对象是我们传进来的data
      Object.keys(data).forEach(key=>{
        paramStr += key + '=' +data[key] + '&'
      });
      if(paramStr){
        paramStr = paramStr.substring(0,paramStr.length-1);
      }
    //  使用axios发送get请求
      promise = axios.get(url + "?" +paramStr)
    }else{
      promise = axios.post(url,data);
    }
    promise.then(response => {resolve(response.data)}).catch(err=>reject(err))
  })
}
