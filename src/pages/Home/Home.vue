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
          <div class="info">
            <div class="info-head flex-cc">
              <div class="info-img-box flex-cc">
                <img src="./../../assets/img/user.jpg" alt="头像" class="info-img cp">
              </div>
            </div>
            <div class="info-body flex-c-sc">
              <div class="info-name c000 fwb fs20">{{userInfo.name}}</div>
              <div class="info-mark c999 fwl fs16">该用户懒得写签名</div>
            </div>
            <div class="info-message flex-sc">
              <div class="message-item flex-cc">
                <i class="iconfont fs15 c999">&#xe61e;</i>
                <span class="fs15 c999">2546</span>
              </div>
              <div class="message-item flex-cc">
                <i class="iconfont fs14 c999">&#xe60c;</i>
                <span class="fs15 c999">2546</span>
              </div>
              <div class="message-item flex-cc">
                <i class="iconfont fs15 c999">&#xe6b0;</i>
                <span class="fs15 c999">2546</span>
              </div>
            </div>
            <div class="info-foot"></div>
          </div>
          <div class="block flex-cc">
            <img src="./../../assets/img/gif_head.jpg" alt="gif_head">
            <img src="./../../assets/img/gif.gif" alt="gif">
          </div>
        </div>
        <div class="mid">
          <div class="head">
            今日话题
          </div>
          <!-- <div class="list" v-for="(item, index) in wordList" :key="index">

          </div> -->
          <div class="list" v-for="num in 6" :key='num'>
            <div class="list-head flex-sc">
              <div class="list-head-left flex-sc">
                <img src="./../../assets/img/user.jpg" alt="头像" class="list-img">
                <div class="list-name flex-c-s">
                  <span class="fs14 c333">{{userInfo.name}}</span>
                  <span class="lh100">
                    <i class="iconfont fs11">&#xe629;</i>
                    <span class="c999 fs11 lh100">10分钟以前</span>
                  </span>
                </div>
              </div>
              <i class="list-like iconfont fs22 cccc flex-cc">&#xe61d;</i>
            </div>
            <div class="list-body">
              <p class="list-title fs16 c333 fwb cp">Senior Wordpress Developer</p>
              <p class="list-content fs15 c333 fwl">疏星淡月，紫陌曲岸，持觞游赏，神移长川。一片彀纹，溶溶泄泄，忽而烟靡云敛。睹一丽人，缦立青水，云蒸雾霭，花衬善睐。荧荧兮若北辰之荣现，扰扰兮若紫玉之生烟。颜如舜华，迫闻素腰华琚摇;和颜静志，远望渌水呈雾绡。戏流光之夜蝶，采舞雪之琼花，流眷眷之眸光，润荣曜之笑靥。</p>
            </div>
            <div class="list-foot flex-sc">
              <div class="foot-left flex-sc">
                <span class="list-message flex-cc">
                  <i class="iconfont fs15 c999">&#xe60c;</i>
                  <span class="fs15 c999">2546</span>
                </span>
                <span class="list-message flex-cc">
                  <i class="iconfont fs15 c999">&#xe61a;</i>
                  <span class="fs15 c999">2546</span>
                </span>
              </div>
              <div class="list-message flex-cc">
                <i class="iconfont fs21 c999">&#xe633;</i>
                <span class="fs15 c999">2546</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="send">
            <div class="send-head cfff fs18 fwb flex-cc">发帖</div>
            <div class="send-content">
              <input type="text" class="input fs15" placeholder="请输入您的标题" v-model.trim="artical.title">
              <textarea class="textarea fs15" cols="30" rows="10" placeholder="请输入您的内容" v-model.trim="artical.content"></textarea>
              <!-- <input type="textarea" class="textarea" placeholder="请输入您的内容"> -->
              <div class="btn fs16 cfff flex-cc fwn" @click="sendArtical">
                发布
              </div>
            </div>
          </div>
          <div class="sort">
            <div class="sort-head flex-cc fwb fs20 cfff">今日帖子排行</div>
            <div class="sort-body flex-c-s c333 fs15">
              <div v-for='(item, index) in 9' :key='index' class="sort-item">
                <span :class="(index < 3 ? 'fwb red fs16' : 'c000')">{{index + 1}}</span>
                <span class="sort-name">日月成碧，画栏悬香</span>
              </div>
               <div class="sort-foot tc fs16 c000 fwb w100">加载更多 ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        @ 展讯-2019 版权所有 
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
      wordList: [],
      artical: {
        title: '',
        content: ''
      },
      replyContent: ''
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
    },
    sendArtical() {
      const { title, content } = this.artical
      if(title.length < 5) {
        this.$Message.info('标题不得少于5个字符')
        return
      }
      if(content.length < 15) {
        this.$Message.info('内容不得少于15个字符')
        return
      }
      this.$get('/sendArtical', {
        title,
        content
      }).then(res => {
        this.$Message.success(res.msg)
      })
      
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
  background: #ccc url('./../../assets/img/bgc.jpg') no-repeat bottom fixed;
  // background: #ccc;
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
  // height: 1400px;
  // background-color: #ccc;
  margin: 100px auto;
  margin-bottom: 60px;
  color: #4158D0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .left{
    width: 23%;
    height: 100%;
    // background-color: #ccc;
    .info{
      width: 100%;
      // height: 400px;
      background-color: #fff;
      .info-head{
        width: 100%;
        height: 100px;
        position: relative;
        background-color: #4158D0;
        .info-img-box{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: absolute;
          bottom: -50px;
          background-color: #fff;
          .info-img{
            width: 93px;
            height: 93px;
            border-radius: 50%;
            transition: transform 1s;
            &:hover{
              transform: rotate(360deg)
            }
          }
        }
      }
      .info-body{
        width: 100%;
        height: 120px;
        padding: 30px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        margin-top: 50px;
        // .info-name{}
      }
      .info-message{
        width: 100%;
        height: 60px;
        padding: 0 30px;
        box-sizing: border-box;
        .message-item{
          height: 100%;
          cursor: pointer;
          transition: all 0.3s;
          &:hover>i,&:hover>span{
            color: #4158D0 !important;
            font-size: 16px;
          }
        }
      }
      .info-foot{
        width: 100%;
        height: 20px;
        background-color: #4158D0;
      }
    }
  }
  .mid{
    width: 50%;
    height: 100%;
    // background-color: #ccc;
    .head{
      width: 100%;
      height: 70px;
      box-shadow: 0 0 2px #ccc;
      border-top: 6px solid #4158D0;
      background-color: #fff;
      text-align: center;
      line-height: 70px;
      padding: 0 30px;
      box-sizing: border-box;
      letter-spacing: 40px;
      font-size: 30px;
    }
    .list{
      width: 100%;
      height: auto;
      background-color: #fff;
      padding: 0 25px;
      box-sizing: border-box;
      margin-top: 20px;
      .list-head{
        width: 100%;
        height: 60px;
        .list-head-left{
          width: 120px;
          height: 100%;
          .list-img{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .list-name{
            height: 30px;
            width: 80px;
            margin-top: 3px;
            span{
              width: 80px;
            }
          }
        }
        .list-like{
          width: 32px;
          height: 100%;
          cursor: pointer;
          &:hover{
            animation: bigger 0.5s linear;
            animation-fill-mode: forwards;
          }
        }
        @keyframes bigger {
          25% {
            font-size: 32px;
            color: rgba(255, 0, 0, 0.25)
          }
          50% {
            font-size: 24px;
            color: rgba(255, 0, 0, 0.5)
          }
          75% {
            font-size: 28px;
            color: rgba(255, 0, 0, 0.75)
          }
          100%{
            font-size: 24px;
            color: rgb(255, 0, 0)
          }
        }
      }
      .list-body{
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ccc;
        .list-title{
          width: 100%;
          // height: 30px;
          line-height: 30px;
        }
        .list-content{
          width: 100%;
          // height: 60px;
          padding: 8px 0 15px 0;
          text-indent: 2em;
          line-height: 150%;
          transition: opacity 0.2s;
          cursor: pointer;
          &:hover{
            // color: #666;
            opacity: 0.7;
          }
        }
      }
      .list-foot{
        width: 100%;
        height: 40px;
        .foot-left{
          width: 120px;
        }
        .list-message{
          height: 100%;
          cursor: pointer;
          &:hover>i,&:hover>span{
            color: #4158D0 !important;
            // font-size: 16px;
          }
        }
      }
    }
  }
  .right{
    width: 23%;
    height: 100%;
    // background-color: #ccc;
    .send{
      width: 100%;
      height: auto;
      background-color: #fff;
      .send-head{
        width: 100%;
        height: 50px;
        background-color: #4158D0;
      }
      .send-content{
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        .input{
          width: 100%;
          height: 30px;
          border: none;
          outline: none;
          background-color: #ccc;
          border-radius: 3px;
          margin-top: 12px;
          padding-left: 5px;
          box-sizing: border-box;
        }
        .textarea{
          // text-indent: 1em;
          width: 100%;
          height: 160px;
          border: none;
          outline: none;
          background-color: #ccc;
          border-radius: 5px;
          margin-top: 12px;
          padding: 5px;
          box-sizing: border-box;
          line-height: 120%;
        }
        .btn{
          width: 100%;
          height: 30px;
          border-radius: 4px;
          background-color: #4158D0;
          margin-top: 12px;
          cursor: pointer;
          &:active{
            background: linear-gradient(to right top , #4158D0, #C850C0);
          }
        }
      }
    }
  }
}
.footer{
  width: 100%;
  height: 58px;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  background-color: #fff;
}
i{
  margin-right: 3px;
}
.block{
  width: 100%;
  height: 300px;
  margin-top: 20px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  img:first-of-type{
    width: 100%;
    position: absolute;
    top: 0;
    right: -8px;
  }
}
.sort{
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 20px;
  .sort-head{
    width: 100%;
    height: 50px;
    background-color: #4158D0;
  }
  .sort-body{
    padding: 20px 40px;
    box-sizing: border-box;
    .sort-item{
      width: 100%;
      margin-bottom: 15px;
      cursor: pointer;
      span{
        margin-left: 12px;
      }
      .sort-name{
      &:hover{
          text-decoration: underline;
          // background-color: #000;
        }
      }
    }
    .sort-foot{
      cursor: pointer;
    }
  }
}
</style>