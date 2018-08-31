<template>
  <section class="loginContainer" >
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:!loginWay}" @click.prevent="loginWay=false">短信登录</a>
          <a href="javascript:;" :class="{on:loginWay}"  @click.prevent="loginWay=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--初始显示界面为手机验证码登录界面-->
          <div :class="{on:!loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <!--此按钮添加了disabled的属性，不能点击,绑定一个回调，格式是一个三元表达式，由两个因素决定：是否正在计时，手机号是否正确-->
              <button :disabled="!isRightPhone || computeTime > 0" class="get_verification"
                :class="{right_phone_number:isRightPhone}" @click.prevent = "sendCode">
                {{computeTime > 0 ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <div :class="{on:loginWay}">
            <!--账号密码登录-->
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <!--密码的显示与隐藏区域-->
                <div class="switch_button" :class = "isShowPwd ? 'on': 'off' " @click.prevent = "isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'off' : 'on'}}</span>
                </div>
              </section>
              <!--图形验证码区域-->
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!--给ref添加一个captcha属性-->
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click.prevent="updateCaptcha">
              </section>
            </section>
          </div>

          <!--写btn的点击回调：login（）-->
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {reqSendCode,reqPwdLogin, reqMsgLogin} from '../../api'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
    data() {
      return {
        loginWay: true,
        phone: '',
        code: '',
        name: '',
        pwd: '',
        captcha: '',
        computeTime: 0,
        isShowPwd: false
      }
    },
    computed: {
      isRightPhone() {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
//      发送验证码的函数
      async sendCode() {
//        计时器
        this.computeTime = 30;
        const timer = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            this.computeTime = 0;
            clearInterval(timer)
          }
        }, 1000)
//        可以发请求了
        const result = await reqSendCode(this.phone);
        if (result.code === 0) {
          Toast('验证码已发送')
        } else {
//          停止计时
          this.computeTime = 0;
          MessageBox.alert('验证码发送失败', '提示')
        }
      },
//      更新图形验证码
      updateCaptcha() {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },

      /*请求登录流程：
    * 1.前台表单验证（分为两种方式）：分别处理
    * 2.验证通过后，提交登录的请求：考虑await
    *   1.短信：停止计时
    *   2.验证码：只要提交请求后就需要更新验证码
    * 3.根据请求结果进行处理
    *   1.成功
    *   2.失败
    *考虑：需要数据吗？如果需要，需要哪些数据？
    *   1.短信：phone,code
    *   2.账号：name,pwd,captcha
    * */
      async login() {
        const {phone, code, name, pwd, captcha} = this;
//      定义result，用来接收返回的user数据
        let result;
//      如果密码登录有三个需要判断
        if (this.loginWay) {
          if (!name) {
            MessageBox.alert('提示','请输入用户名');
            return
          } else if (!pwd) {
            MessageBox.alert('密码错误');
            return
          } else if (captcha.length !== 4) {
            MessageBox.alert('验证码输入错误');
            return
          }
//          发请求，密码方式登录
          result = await reqPwdLogin(name,pwd,captcha);
//          只要发送请求就要更新验证码
          this.updateCaptcha();
        }

//      如果短信验证码登录有两个需要判断
        else {
          if (!phone) {
            MessageBox.alert('手机号输入不正确');
            return
          } else if (!code) {
            MessageBox.alert('验证码错误');
            return
          }
          result= await reqMsgLogin(phone,code);
        }
//        停止计时
        if(this.computeTime>0){
          this.computeTime = 0
        }
//        根据请求的结果进行处理
        if(result.code === 0){//成功
          const user = result.data;
//          保存user
          this.$store.dispatch('saveUser',user);
//          自动跳转到个人中心
          this.$router.replace('/profile');
        }else{
          MessageBox.alert(result.msg)
        }
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
