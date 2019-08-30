<template>
  <div class="login">
    <div class="container">
      <div class="item">
        <img src="./../../assets/img/login_usr.png" alt="user">
      </div>
      <div class="item">
        <h3 class="title">账号{{way}}</h3>
        <div class="input" v-if="way === '注册'">
          <i class="iconfont i">&#xe638;</i>
          <input type="text" placeholder="昵称" v-model="name">
        </div>
        <div class="input">
          <i class="iconfont i">&#xe602;</i>
          <input type="text" placeholder="邮箱" v-model="emil">
        </div>
        <div class="input">
          <i class="iconfont i">&#xe630;</i>
          <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="btn" @click="login">
          {{way}}
        </div>
        <Tooltip content="忘记了就重新注册: )" class="mt10"><a href="#" v-if="way == '登陆'">忘记密码</a></Tooltip>
        <a href="#" class="item-bottom" @click="changeWay('注册')" v-if="way == '登陆'">还没有账号? 立即注册 <i class="iconfont">&#xe600;</i></a>
        <a href="#" class="item-bottom" @click="changeWay('登陆')" v-else>已有账号? 去登陆 <i class="iconfont">&#xe600;</i></a>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/request/api'
export default {
  components: {},
  data() {
    return {
      way: '登陆',
      emil: '',
      password: '',
      name: ''
    };
  },
  methods: {
    changeWay(way) {
      if(way == '注册'){
        this.password = ''
      }
      this.way = way
    },
    login() {
      if(this.way === '登陆') {
        post('/login', {
          emil: this.emil,
          password: this.password
        })
      } else {
        post('/addUser', {
          name: this.name,
          emil: this.emil,
          password: this.password
        }).then(msg => {
          console.log(msg);
        })
      }
    }
  },
  beforeDestroy() {},
};
</script>


<style scoped lang='less'>
/* common css */
@inputWidth: 280px;
@inputHeight: 48px;
input /deep/{
  outline: none;
  border: none;
  background-color: #E6E6E6;
  height: 100%;
  font-size: 16px;
  color: #666;
}
a{
  color: #666;
  font-size: 14px;
  margin-top: 15px;
}
h3{
  margin-bottom: 40px;
}


/**           **/
.login{
  width: 100%;
  height: 100%;
  background: linear-gradient(to right top , #4158D0, #C850C0);
  display: flex;
  justify-content: center;
  align-items: center;
  .container{
    width: 50vw;
    min-width: 600px;
    height: 70vh;
    min-height: 400px;
    background-color: #FFFFFF;
    border-radius: 15px;
    display: flex;
    .item{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      position: relative;
      .input{
        width: @inputWidth;
        height: @inputHeight;
        border-radius: calc(@inputHeight / 2);
        line-height: @inputHeight;
        background-color: #E6E6E6;
        margin-bottom: 15px;
        display: flex;
        overflow: hidden;
        i{
          flex: 1;
          text-align: center;
          font-size: 15px;
          margin-top: 1px;
        }
        input{
          flex: 5;
        }
      }
      .btn{
        width: @inputWidth;
        height: @inputHeight;
        text-align: center;
        border-radius: calc(@inputHeight / 2);
        line-height: @inputHeight;
        color: #ffff;
        background-color: #57b846;
        font-size: 15px;
        margin-top: 30px;
        cursor: pointer;
        box-shadow: 0 0 2px #ccc;
        // &:hover{
        //   background-color: #46b868;
        // }
        &:active{
          background-color: #0dec50;
          box-shadow: 0 0 1px #0dec50;
        }
      }
      .title{
        font-size: 25px;
        color: #333333;
        font-weight: lighter;
      }
      .item-bottom{
        position: absolute;
        bottom: 30px;
      }
    }
  }
}



</style>