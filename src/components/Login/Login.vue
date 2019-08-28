<template>
  <div class="login">
    <div class="container">
      <div class="item">
        <img src="./../../assets/img/login_usr.png" alt="user">
      </div>
      <div class="item">
        <h3 class="title">会员登入</h3>
        <div class="input">
          <i class="iconfont">&#xe602;</i>
          <input type="text" placeholder="邮箱">
        </div>
        <div class="input">
          <i class="iconfont">&#xe630;</i>
          <input type="text" placeholder="密码">
        </div>
        <div class="btn">
          登陆
        </div>
        <a href="#" target="_blank">忘记密码</a>
        <a href="#" class="item-bottom">还没有账号? 立即注册 <i class="iconfont">&#xe600;</i></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
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
  height: 40px;
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