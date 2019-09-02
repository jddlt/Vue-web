<template>
  <div class='home'>
    <Menu enu mode="horizontal" :theme="theme_color" active-name="1" :accordion='true'  @on-select="select" class="head-bar">
        <MenuItem name="1" class="ml10">
            <h1 class="h1"><img src="./../../assets/img/logo.png" alt="展讯"></h1>
        </MenuItem>

        <Submenu name="2" class="fr mr10" v-if="userInfo.name">
            <template slot="title">
              <img src="./../../assets/img/user.jpg" alt="头像" class="user-img">
              <!-- <Icon type="ios-contact" class="fs25" /> -->
              {{userInfo.name}}
            </template>
            <MenuItem name="2-1">个人中心</MenuItem>
            <MenuItem name="2-2">退出登录</MenuItem>
        </Submenu>

        <MenuItem name="3" class="fr mr10" v-else>
            <Icon type="ios-contact" class="fs25"/>
            登录
        </MenuItem>

        <MenuItem name="4" class="fr" v-if="userInfo.name">
            <!-- <Icon type="ios-contact" class="fs25"/> -->
            <span class="info">
              消息
              <span class="dot" v-if="message">
                {{message}}
              </span>
            </span>
        </MenuItem>
      </Menu>
      <div class="content fwb">
        <div class="left">
          <div></div>
        </div>
        <div class="mid">
          <div class="head">
            今日话题
          </div>
          <div class="list" v-for="(item, index) in wordList" :key="index">

          </div>
        </div>
        <div class="right">
          
        </div>
      </div>
      <div class="footer">
        @ 版权所有
      </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  components: {},
  data() {
    return {
      userInfo: {},
      theme_color: 'primary',
      message: 4,
      wordList: [
        {
          title: '我是第一条',
          content: '疏星淡月，紫陌曲岸，持觞游赏，神移长川。一片彀纹，溶溶泄泄，忽而烟靡云敛。睹一丽人，缦立青水，云蒸雾霭，花衬善睐。荧荧兮若北辰之荣现，扰扰兮若紫玉之生烟。颜如舜华，迫闻素腰华琚摇;和颜静志，远望渌水呈雾绡。戏流光之夜蝶，采舞雪之琼花，流眷眷之眸光，润荣曜之笑靥.偶得美人回顾，思之朝朝暮暮。采芝兰以明愫，寄琼琚以作妆。余咏永慕叹道长，彼应影独愿偕芳。才知世有解语，不过琪语溯光',
          createTime: '2019-09-02 20:50:08',
        }
      ]
    };
  },
  methods: {
    getUserInfo() {
      this.$get('/userInfo', {}).then(msg => {
        this.userInfo = msg.data || {}
      })
    },
    select(name) {
      if(name == '1') {
        this.$router.push('/')
      } else if (name == '2-1') {
        this.$Message.info({
          content: '个人中心在哪里呢?'
        })
      } else if (name == '2-2') {
        this.loginOut()
      } else if (name == '3') {
        Cookie.remove('token')
        this.$router.push('/login')
      } else if (name == '4') {
        this.$Message.info({
          content: '我的消息呢?'
        })
      }
    },
    loginOut() {
      Cookie.remove('token')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.getUserInfo()
  },
  beforeDestroy() {}
};
</script>


<style scoped lang='less'>
.home{
  width: 100%;
  height: 100%;
  background: url('./../../assets/img/bgc.jpg') no-repeat bottom fixed;
  background-size: cover;
  overflow: auto;
  zoom: 1;
}
.ivu-menu-primary{
  background: linear-gradient(to right top , #4158D0, #C850C0);
  box-shadow: 0 0 5px #666;
  opacity: 0.9;
  width: calc(100vw - 12px);
  position: fixed;
  left: 0;
  top: 0;
}
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover, 
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover{
  background: linear-gradient(to right top , #4158D0, #C850C0);
}
.h1{
  height: 46px;
  margin-top: 7px;
  img{
    height: 100%;
  }
}
.info{
  display: inline-block;
  position: relative;
  .dot{
    position: absolute;
    border-radius: 50%;
    text-align: center;
    line-height: 13px;
    font-size: 13px;
    background-color: red;
    color: #fff;
    width: 14px;
    height: 14px;
    right: -11px;
    top: 12px;
  }
}
.user-img{
  vertical-align: -7px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  margin-right: 2px;
}
.content{
  width: 1200px;
  height: 1400px;
  background-color: #fff;
  margin: 100px auto;
  margin-bottom: 60px;
  color: #4158D0;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .left{
    width: 23%;
    height: 100%;
    background-color: #ccc;
  }
  .mid{
    width: 50%;
    height: 100%;
    background-color: #aaa;
    .head{
      width: 100%;
      height: 80px;
      box-shadow: 0 0 2px #ccc;
      border-top: 5px solid #4158D0;
      background-color: #ccc;
      text-align: center;
      line-height: 80px;
      padding: 0 30px;
      box-sizing: border-box;
      letter-spacing: 40px;
    }
    .list{
      width: 100%;
      height: auto;
    }
  }
  .right{
    width: 23%;
    height: 100%;
    background-color: #ccc;
  }
}
.footer{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-color: #fff;
}
</style>