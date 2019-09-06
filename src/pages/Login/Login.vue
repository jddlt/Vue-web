<template>
  <div class="login">
    <upload />
    <div class="container">
      <div class="item">
        <img src="./../../assets/img/login_usr.png" alt="user">
      </div> 
      <div class="item">  
        <h3 class="title">账号{{way}}</h3>
        <div class="input" v-if="way === '注册'">
          <i class="iconfont i">&#xe638;</i>
          <input type="text" placeholder="昵称" v-model.trim="name">
        </div>
        <div class="input">
          <i class="iconfont i">&#xe602;</i>
          <input type="text" placeholder="邮箱" v-model.trim="emil">
        </div>
        <div class="input">
          <i class="iconfont i">&#xe630;</i>
          <input type="password" placeholder="密码" v-model.trim="password">
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
import upload from '@/components/upload/Upload'
export default {
  components: {
    upload
  }, 
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
      if (!this.emil.trim()) {
        this.$Message.error('邮箱不能为空')
        return
      }
      if (!this.password.trim()) {
        this.$Message.error('密码不能为空')
        return
      }
      if(!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.emil)) {
        this.$Message.error('邮箱格式不正确')
        return
      }
      if(this.way === '登陆') {
        if(this.password.length < 6) {
          this.$Message.error('密码需要六位及以上')
          return
        }
        this.$post('/login', {
          emil: this.emil,
          password: this.password
        }).then(msg => {
          if(msg.code == 200){
            this.$Message.success({  content: '登陆成功' })
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          }
        })
      } else if (this.way === '注册'){
        if (!this.name.trim()) {
          this.$Message.error('昵称不能为空')
          return
        }
        if(this.name.length < 2) {
          this.$Message.error('昵称不能小于两位')
          return
        }
        if(this.password.length < 6) {
          this.$Message.error('密码不能小于六位')
          return
        }
        this.$post('/addUser', {
          name: this.name,
          emil: this.emil,
          password: this.password
        }).then(msg => {
          if(msg.code == 200){
            this.$Message.success({ content: '注册成功,即将跳转到登录页' })
            setTimeout(() => {
              this.way = '登陆'
            }, 1500)
          }
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
        background-color: #E6E6E6 !important;
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