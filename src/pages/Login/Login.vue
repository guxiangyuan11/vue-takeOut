<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="sendSms()">
                {{computedTime?`已发送 ${computedTime}s` : '获取验证码'}}
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
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-show="!showPwd" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-show="showPwd" v-model="pwd">
                <div class="switch_button" :class="{off:!showPwd,on:showPwd}" @click.prevent="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>

      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="hiddenAlert=false" v-show="hiddenAlert"></AlertTip>
  </section>

</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqSendcode, reqLoginSms, reqLoginPwd} from '../../api/index'

export default{
  data: function () {
    return {
      loginWay: true, // 登陆的方式，true是验证码登录，false是密码登陆
      computedTime: 0, // 倒计时
      alertText: '', // 提示信息
      showPwd: false, // 是否显示密码
      hiddenAlert:false, // 是否隐藏提示栏
      pwd: '', // 密码
      code: '', // 验证码
      phone: '', // 手机号
      name: '', // 用户名
      captcha: '', // 图片验证码
      reqCode: ''
    }
  },
  mounted:function () {

  },
  computed:{
    rightPhone(){
        return /^1\d{10}$/.test( this.phone );
    }
  },
  methods:{

//      异步登陆
    async login(){
      let res
//        表单验证
      if(this.loginWay){ // 短信登陆
        const {code, phone, rightPhone} = this;
        if(!rightPhone){
            // 提示手机号错误
          this.alertPlant('提示手机号错误');
          return
        }else if(!/^d{6}$/.test(code) && code !== '112345'){
            // 验证码错误，请重新输入
          this.alertPlant('验证码错误，请重新输入');
          return
        }
        /*res = await reqLoginSms(phone,code)
        if(res.code === 1){
            // 这里故意接收的错误码，因为没有正确的code,然后模拟成功接收到数据
         let user= {
            "code": 0,
            "data": {
            "_id": "5a9cd9c6ad5b2d34d42b385d",
              "phone": "13716962779"
           }
          }
        }
        console.log(res)*/
      }else {
        const {pwd, name, captcha} = this;
        if( !name ){
          // 必须要有用户名
          this.alertPlant('必须要有用户名');
          return
        }else if( !pwd ){
          // 必须要有密码
          this.alertPlant('必须要有密码');
          return
        }else if( !captcha ){
          // 必须要有图形验证码
          this.alertPlant('必须要有图形验证码');
          return
        }
        res = await reqLoginPwd(name, pwd, captcha)
        console.log(res);

      }
      if(res.code===0){ // 当code为0的时候表示返回成功
        const userInfo = res.data
        // 将用户信息保存到VUEX
        this.$store.dispatch('setShops', userInfo)
        // 转到profile
        this.$router.replace('/profile')
        /*const user = {
         "code": 0,
         "data": {
         "_id": "5b8e5af353b3cc1fb81ce365",
         "name": "bbb"
         }
         }*/
      }else {
        // 这里调用错误提示
        this.alertPlant(res.msg)
        this.getCaptcha() // 刷新图片验证码
        this.captcha = ''
      }
    },
//    异步获取短信验证码
    sendSms(){
        // 倒计时
      if(this.computedTime <=0){
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime --;
          if(this.computedTime === 0){
            clearInterval(this.timer)
          }
        },1000)
        // 发送ajax请求
      }
      this.reqCode = reqSendcode(); // 模拟发短信请求后接收到短信code
      setTimeout( () => {
        clearInterval(this.timer)
        this.computedTime=0
      },1000)
    },
    alertPlant(text){
      this.alertText = text
      this.hiddenAlert = true;
    },
    getCaptcha(){
        // 每次指定的src
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()

    }
  },
  props: {},
  components: {
    AlertTip
  },
  templates: {}
}
</script>

<style lang="scss">
@import "../../common/scss/mixins";
.loginContainer{
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .loginInner{
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
    .login_header{
      .login_logo{
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }
      .login_header_title{
        padding-top: 40px;
        text-align: center;
        >a{
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;
          &:first-child{
            margin-right: 40px;
          }
          &.on{
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }

        }
      }
    }
    .login_content{
      >form{
        >div{
          display: none;
          &.on{
            display: block;
          }
          input{
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            &:focus{
              border: 1px solid #02a774;
            }
          }
          .login_message{
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .get_verification{
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.right_phone{
                color: #000;
              }
            }
          }
          .login_verification{
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .switch_button{
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color .3s,border-color .3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              &.off{
                background: #fff;
                .switch_text{
                  float: right;
                  color: #ddd;
                }
              }
              &.on{
                background: #02a774;
              }
              >.switch_circle{
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
                transition: transform .3s;
                &.right{
                  transform: translateX(28px);
                }
              }
            }
          }
          .login_hint{
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            >a{
              color: #02a774;
            }

          }
        }
        .login_submit{
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }
      .about_us{
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }
    .go_back{
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      >.iconfont{
        font-size: 20px;
        color: #999;
      }

    }
  }
}
</style>
