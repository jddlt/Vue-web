<template>
  <div class="home">
    <!-- <marquee align="absmiddle" behavior="scroll" bgcolor="#ccc" direction="left" height="50px" width="100%" style="margin-top: 100px">不得已, 回复删除啦 (ノへ￣、) </marquee> -->
    <HeadBar></HeadBar>
    <div class="content fwb">
      <div class="left">
        <div class="info bs">
          <div class="info-head flex-cc">
            <div class="info-img-box flex-cc">
              <!-- <upload :avatar="userInfo.avatar" /> -->
              <img :src="$crop(userInfo.avatar, 93, 93, time)" alt="" v-if='userInfo.name' class="info-img bss cp" @click="showInfo(userInfo)">
              <Icon type="ios-contact" class='fs95 cp' v-else/>
            </div>
          </div>
          <div class="info-body flex-c-sc">
            <div class="info-name c000 fwb fs20">{{userInfo.name || '未登录'}}</div>
            <div class="info-mark c666 fwl fs12">{{userInfo.name ? (userInfo.tips ? userInfo.tips : '该用户暂未填写签名') : '你还没登陆呢'}}</div>
          </div>
          <div class="info-message flex-sc">
            <div class="message-item flex-cc">
              <i class="iconfont fs15 c999 fwl" title='阅读数'>&#xe663;</i>
              <span class="fs15 c999 ml5">{{userInfo.looks || 0}}</span>
            </div>
            <div class="message-item flex-cc">
              <i class="iconfont fs14 c999 fwl" title='获赞数'>&#xe60c;</i>
              <span class="fs15 c999 ml5 mt-1">{{userInfo.like || 0}}</span>
            </div>
            <div class="message-item flex-cc">
              <i class="iconfont fs14 c999 fwl" title='发帖数'>&#xe6b0;</i>
              <span class="fs15 c999 ml5">{{userInfo.artical_num || 0}}</span>
            </div>
          </div>
          <div class="info-foot"></div>
        </div>
        <div class="block bs">
          <!-- <img src="./../../../static/img/gif_head.jpg" alt="gif_head" />
          <img src="./../../../static/img/gif.gif" alt="gif" /> -->
          <div class="category">
            <div class="type-title flex-cc">
              <i class="iconfont fs16 mr5">&#xe621;</i>
              分类
            </div>
            <div class="flex-c-cc mt10">
              <a v-for='type in typeList' :key='type' class="flex-r-c aa">{{type.name}} ({{type.count}})</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mid mb20">
        <div class="head bs">今日话题</div>
        <div class="list bs" v-for="(item, index) in (articalList ? articalList : 5)" :key="item._id">
          <div class="list-head flex-sc">
            <div class="list-head-left flex-sc" @click="showInfo(item.author)">
              <img :src="$crop(item.author.avatar, 35, 35, time)" alt class="list-img cp" />
              <div class="list-name flex-c-s">
                <span class="fs14 c333 cp">{{item.author.name}}</span>
                <span class="lh100">
                  <i class="iconfont fs11">&#xe629;</i>
                  <span class="c999 fs11 lh100">{{timesAgo(item.create_time)}}</span>
                </span>
              </div>
            </div>
            <i :class="'list-like iconfont fs22 cccc flex-cc usn' + (((bigger == index) && (item.likes.includes(userInfo._id))) ? ' bigger-2' : '') + (item.likes.includes(userInfo._id) ? ' red' : '')" title='点赞' @click="iLike(item._id, index, item.likes)">&#xe61d;</i>
          </div>
          <div class="list-body" @click="articalDetail(item._id)">
            <p class="list-title fs16 c000 fwb cp es1">{{item.title}}</p>
            <p class="list-content fs13 c666 fwl es2">{{item.content | compile}}</p>
          </div>
          <div class="list-foot flex-sc">
            <div class="foot-left flex-c">
              <span class="list-message flex-cc">
                <i class="iconfont fs15 c999 fwl" title='点赞数'>&#xe60c;</i>
                <span class="fs15 c999 ml2">{{item.collect || 0}}</span>
              </span>
              <span class="list-message flex-cc ml20">
                <i class="iconfont fs16 c999 fwl" title='浏览量'>&#xe663;</i>
                <span class="fs15 c999 ml2">{{item.looks || 0}}</span>
              </span>
              <span class="list-message flex-cc ml10">
                <i class="iconfont fs15 c999 ml20">&#xe61a;</i>
                <span class="fs15 c999 mt-2">{{item.answer.length || 0}}</span>
              </span>
            </div>
            <div class="list-message flex-cc c999 fwl mr5 read-more" @click="articalDetail(item._id)">
              阅读更多 
              <i class="iconfont c666 fs12 mt-1">&#xe60e;</i>
            </div>
          </div>
        </div>
        <Spin size="large" v-if="loadStyle === 'loading'" class="w100 flex-cc mt20"></Spin>
        <div v-if="loadStyle === 'loadOver'" class="w100 flex-cc mt20 c999">暂无更多</div>
      </div>
      <!-- </div>
      </div>-->
      <div class="right">
        <div class="send bs">
          <div class="send-head cfff fs18 fwb flex-cc">发帖</div>
          <div class="send-content">
            <input
              type="text"
              class="input fs15"
              placeholder="请输入您的标题"
              v-model.trim="artical.title"
            />
            <textarea
              class="textarea fs15"
              cols="30"
              rows="10"
              placeholder="请输入您的内容"
              v-model.trim="artical.content"
            ></textarea>
            <!-- <input type="textarea" class="textarea" placeholder="请输入您的内容"> -->
            <div class="btn fs16 cfff flex-cc fwn" @click="sendArtical">发布</div>
          </div>
        </div>
        <div class="sort bs">
          <div class="sort-head flex-cc fwb fs20 cfff">今日帖子排行</div>
          <div class="sort-body flex-c-s c333 fs15">
            <div v-for="(item, index) in articalSort" :key="index" class="sort-item" @click='articalDetail(item._id)'>
              <span :class="(index < 3 ? 'fwb red fs16' : 'c000')">{{index + 1}}</span>
              <span class="sort-name fs14">{{item.title}}</span>
            </div>
            <!-- <div class="sort-foot tc fs16 c000 fwb w100">加载更多 ></div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <Page :current="1" :total="total" simple class="page flex-cc" @on-change='changeIndex' :page-size='5'/> -->
    <InfoDialog :isOpen='isOpen' :userInfo='showUserInfo' :time='time'></InfoDialog>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapGetters } from "vuex";
import { timeAgo } from "./../../util/formatTime";
import { showdown, VueShowdown } from 'vue-showdown'
import upload from "@/components/upload/Upload";
import HeadBar from "@/components/headBar/HeadBar";
import Footer from "@/components/footer/Footer";
import InfoDialog from "@/components/infoDialog/InfoDialog";
export default {
  components: {
    upload,
    HeadBar,
    Footer,
    InfoDialog
  },
  data() {
    return {
      articalList: [],
      typeList: [],
      // typeList: ['全部', 'Javascript', 'Vue', 'React', 'Webpack', 'Markdown', 'Jquery', 'Node', 'Python', 'Css', '闲聊'],
      artical: {
        title: "",
        content: ""
      },
      replyContent: "",
      time: new Date().getTime(),
      articalSort: [],
      total: 0,
      isOpen: false,
      showUserInfo: {},
      bigger: NaN,
      timer: 0,
      pageIndex: 1,
      times: 0,
      timeStart: null,
      loadStyle: 'loadMore',
      scrollTimer: ''
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  filters: {
    compile(text) {
      let converter = new showdown.Converter(),
      html = converter.makeHtml(text);
      html = html.replace(/<h[1-6].*\/h[1-6]>/g, '');
      html = html.trim().replace(/<\/?[^>]*>/g, '');
      return html
    }
  },
  methods: {
    sendArtical() {
      const { title, content } = this.artical;
      if (title.length < 5) {
        this.$Message.info("标题不得少于5个字符");
        return;
      }
      if (content.length < 15) {
        this.$Message.info("内容不得少于15个字符");
        return;
      }
      this.$post("/artical/sendArtical", {
        title,
        content,
        author: JSON.stringify(this.userInfo)
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success("发帖成功");
          this.artical = { title: "", content: "" };
          this.getArticalList();
        }
      });
    },

    getArticalList(index = 1) {
      this.loadStyle = 'loading'
      this.$get("/artical", {
        pageIndex: index
      }).then(res => {
        if (res.code == 200) {
          this.articalList = res.data;
          this.pageIndex = 1
          this.loadStyle = 'loadMore'
        }
      });
    },

    getArticalTypeNum() {
      this.$get("/artical/typeNum", {
      }).then(res => {
        if (res.code == 200) {
          this.typeList = res.data
          // this.articalList = res.data;
          // this.pageIndex = 1
          // this.loadStyle = 'loadMore'
        }
      });
    },

    getArticalSort() {
      this.$get("/artical/sort", {}).then(res => {
        if (res.code == 200) {
          this.articalSort = res.data;
        }
      });
    },


    timesAgo(time) {
      return timeAgo(time);
    },

    articalDetail(_id) {
      this.$router.push({
        path:  `/artical?id=${_id}`
      });
    },

    changeIndex(index) {
      this.getArticalList(index)
      this.pageIndex = index
    },

    showInfo(author) {
      this.isOpen = true,
      this.showUserInfo = author
    },

    closeInfo() {
      this.isOpen = false
    },
    getUserInfo() {
      this.$get("/userInfo", {}).then(msg => {
        this.$store.dispatch("setUserInfo", msg.data);
      });
    },
    iLike(id, index, likes) {
      this.times++;
      this.timeStart || (this.timeStart = new Date().getTime())
      if(this.times == 4) {
        if((Date.now() - this.timeStart) < 2500) {
          this.$Message.error('你点这么快干嘛??')
        }
        this.times = 0
        this.timeStart = null
      }
      clearTimeout(this.timer)
      this.bigger = index;
      this.$get('/artical/like', {
        id,
        is_like: !likes.includes(this.userInfo._id)
      }).then(res => {
        if(res.code == 200) {
          this.getArticalList(this.pageIndex)
          this.getUserInfo()
          this.getArticalSort()
          this.$Message.info(res.msg)
        }
      })
      this.timer = setTimeout(() => {
        this.bigger = NaN
        clearTimeout(this.timer)
      }, 500)
    },
    scroll() {
      window.onscroll = (e) => {
        this.scrollTimer && clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          console.log(1111);
          const bottom = e.target.scrollingElement.scrollHeight-e.target.scrollingElement.scrollTop-e.target.scrollingElement.offsetHeight
          // 距离底部0时加载一次
          if (bottom <= 300 && this.loadStyle == 'loadMore') {
            this.loadStyle = 'loading'
            // 延时0.5s已获得优化空间
            setTimeout(() => {
              this.pageIndex++
              this.$get("/artical", {
                pageIndex: this.pageIndex
              }).then(res => {
                if (res.code == 200) {
                  this.articalList = this.articalList.concat(res.data);
                  if(res.data.length < 5) {
                    this.loadStyle = 'loadOver'
                  } else {
                    this.loadStyle = 'loadMore'
                  }
                }
              });
            }, 500)
          }
       }, 20)
      }
    }
  },
  mounted() {
    this.getArticalList();
    this.getArticalSort();
    this.getArticalTypeNum();
    this.scroll()
  },
  beforeDestroy() {}
};
</script>


<style scoped lang='less'>
.home {
  width: 100%;
  padding-bottom: 1px;
}
.ivu-menu-primary {
  box-shadow: 0 0 5px #666;
  opacity: 0.9;
  width: calc(100vw - 12px);
  position: fixed;
  left: 0;
  top: 0;
  .bgc;
}
.content {
  width: 100%;
  margin: 30px auto;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .c;
  .left {
    width: 256px;
    height: 100%; 
    margin-right: 28px;
    .info {
      width: 100%;
      background-color: #fff;
      .info-head {
        width: 100%;
        height: 100px;
        position: relative;
        .bgc;
        .info-img-box {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: absolute;
          bottom: -50px;
          background-color: #fff;
          .info-img {
            width: 93px;
            height: 93px;
            border-radius: 50%;
            transition: transform 1s;
            &:hover {
              transform: rotate(360deg);
            }
          }
          .fs95 {
            font-size: 93px;
            transition: transform 1s;
            &:hover {
              transform: rotate(360deg);
            }
          }
        }
      }
      .info-body {
        width: 100%;
        height: 120px;
        padding: 30px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        margin-top: 50px;
      }
      .info-message {
        width: 100%;
        height: 60px;
        padding: 0 30px;
        box-sizing: border-box;
        .message-item {
          height: 100%;
          cursor: pointer;
          transition: all 0.3s;
          &:hover > i,
          &:hover > span {
            .c;
          }
        }
      }
      .info-foot {
        width: 100%;
        height: 20px;
        .bgc;
      }
    }
  }
  .mid {
    width: 94%;
    max-width: 600px;
    min-width: 325px;
    height: 100%;
    .head {
      width: 100%;
      height: 70px;
      box-shadow: 0 0 2px #ccc;
      .c;
      background-color: #fff;
      text-align: center;
      line-height: 70px;
      padding: 0 30px;
      box-sizing: border-box;
      letter-spacing: 40px;
      font-size: 30px;
    }
    .list {
      width: 100%;
      height: auto;
      background-color: #fff;
      padding: 0 25px;
      box-sizing: border-box;
      margin-top: 20px;
      transition: transform 0.2s;
      &:hover{
        transform: translate(0, -2px);
        box-shadow: 
          0 0 4px #999 !important;
      }
      .list-head {
        width: 100%;
        height: 60px;
        .list-head-left {
          width: 120px;
          height: 100%;
          .list-img {
            width: 35px !important;
            min-width: 35px !important;
            height: 35px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .list-name {
            height: 30px;
            width: 150px;
            margin-top: 2px;
            span {
              width: 150px;
            }
          }
        }
        .list-like {
          width: 32px;
          height: 100%;
          cursor: pointer;
          &:hover {
            color: rgb(255, 0, 0);
          }
        }
        .bigger-2 {
          animation: bigger 0.4s linear;
        }
        @keyframes bigger {
          25% {
            font-size: 24px;
            color: rgba(255, 0, 0, 0.25);
            opacity: 1;
          }
          50% {
            font-size: 50px;
            color: rgba(255, 0, 0.5);
            opacity: 0.66;
          }
          75% {
            font-size: 75px;
            color: rgba(255, 0, 0, 0.75);
            opacity: 0.33;
          }
          100% {
            font-size: 100px;
            color: rgb(255, 0, 0);
            opacity: 0;
          }
        }
      }
      .list-body {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ccc;
        &:hover {
          opacity: 0.85;
        }
        .list-title {
          width: 100%;
          line-height: 30px;
        }
        .list-content {
          width: 100%;
          margin: 0 0 7px 0;
          text-indent: 2em;
          line-height: 170%;
          transition: opacity 0.2s;
          cursor: pointer;
        }
      }
      .list-foot {
        width: 100%;
        height: 40px;
        .foot-left {
          width: 120px;
        }
        .list-message {
          height: 100%;
        }
      }
      .talk {
        // border-top: 1px solid #ccc;
        transition: height 0.3s;
        // padding-bottom: 20px;
        overflow: hidden;
        .talk-input {
          width: 100%;
          padding: 10px 0;
          .bbt-box {
            position: relative;
            width: 480px;
            // width: 80%;
            height: 38px;
            .bbt {
              position: absolute;
              width: 0;
              height: 1px;
              border-bottom: 1px solid #4158d0;
              left: 5px;
              bottom: 0;
              transition: width 0.3s;
            }
            .real-input {
              width: 480px;
              outline: none;
              height: 38px;
              border: none;
              transition: border-bottom 1s;
              font-size: 15px;
              &:focus + .bbt {
                width: 480px;
              }
            }
          }
          .talk-btn {
            width: 30px;
            height: 100%;
            text-align: right;
            line-height: 38px;
            transition: textAlign 0.5s;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            &:hover {
              // background-color: #eee;
              // text-align: center;
              text-decoration: underline;
            }
          }
        }
        .talk-list {
          margin-left: 5px;
          margin-bottom: 9px;
          &:last-of-type {
            padding-bottom: 12px;
          }
        }
      }
    }
  }
  .right {
    width: 276px;
    height: 100%;
    margin-left: 28px;
    // background-color: #ccc;
    .send {
      width: 100%;
      height: auto;
      background-color: #fff;
      .send-head {
        width: 100%;
        height: 50px;
        // background-color: #4158d0;
        .bgc;
      }
      .send-content {
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        .input {
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
        .textarea {
          // text-indent: 1em;
          width: 100%;
          height: 220px;
          border: none;
          outline: none;
          background-color: #ccc;
          border-radius: 5px;
          margin-top: 12px;
          padding: 5px;
          box-sizing: border-box;
          line-height: 120%;
        }
        .btn {
          width: 100%;
          height: 30px;
          border-radius: 4px;
          // background-color: #4158d0;
          .bgc;
          margin-top: 12px;
          cursor: pointer;
          &:active {
            background: linear-gradient(to right top, #4158d0, #c850c0);
          }
        }
      }
    }
  }
}
li{
  list-style: none;
}
i {
  margin-right: 3px;
}
.category{
  padding: 25px 0;
  color: #333;
  font-weight: lighter;
  font-size: 16px;
  .type-title{
    padding: 0 0 10px 0;
    border-bottom: 1px dashed #2d8cf0;
    font-size: 17;
    margin-bottom: 5px;
    .c
  }
  .aa{
    &:hover{
      text-decoration: underline !important;
    }
  }
}
.block {
  width: 100%;
  // height: 300px;
  margin-top: 20px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  img:first-of-type {
    width: 100%;
    position: absolute;
    top: 0;
    right: -8px;
  }
}
.sort {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 20px;
  .sort-head {
    width: 100%;
    height: 50px;
    .bgc;
  }
  .sort-body {
    padding: 20px 40px;
    box-sizing: border-box;
    .sort-item {
      width: 100%;
      margin-bottom: 18px;
      margin-left: 1.8em;
      text-indent: -1.7em;
      cursor: pointer;
      span:last-of-type {
        margin-left: 12px;
      }
      .sort-name {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .sort-foot {
      cursor: pointer;
    }
  }
}
.img-format {
  width: 25px;
  min-width: 25px;
  height: 25px;
  min-height: 25px;
  border-radius: 50%;
}
.img-format-min {
  width: 22px;
  height: 22x;
  border-radius: 50%;
}
.page {
  margin: 30px auto;
  width: 153px;
  border-radius: 20px;
  height: 30px;
  background-color: #fff;
}
.read-more{
  cursor: pointer;
  &:hover{
  }
}
.c {
  color: #2d8cf0 !important;
}
.bgc {
  background-color: #2d8cf0;
}
@media screen and (max-width: 1236px) {
  .left {
    display: none !important;
  }
}
@media screen and (max-width: 920px) {
  .right {
    display: none !important;
  }
}
@media screen and (max-width: 600px) {
  .head{
    letter-spacing: 27px !important;
    height: 44px !important;
    font-size: 21px !important;
    line-height: 44px !important;
    margin-top: 15px;
  }
  .content{
    margin-top: 0px;
  }
  .w80{
    width: 85%;
  }
  .real-input{
    width: 100% !important;
  }
  .bbt-box{
    width: 85%;
  }
  .bbt-box{
    padding: 0 18px !important;
  }
}
</style>