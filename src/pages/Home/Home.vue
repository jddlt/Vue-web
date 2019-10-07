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
            <div class="info-mark c999 fwl fs16">{{userInfo.name ? (userInfo.tips ? userInfo.tips : '该用户暂未填写签名') : '你还没登陆呢'}}</div>
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
        <div class="block flex-cc bs">
          <img src="./../../../static/img/gif_head.jpg" alt="gif_head" />
          <img src="./../../../static/img/gif.gif" alt="gif" />
        </div>
      </div>
      <div class="mid">
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
            <p class="list-title fs16 c333 fwb cp es1">{{item.title}}</p>
            <p class="list-content fs15 c333 fwl es3">{{item.content | compile}}</p>
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
              <span class="list-message flex-cc ml20">
                <i class="iconfont fs15 c999 fwl" title='转发'>&#xe6a1;</i>
                <!-- <span class="fs15 c999">2546</span> -->
              </span>
            </div>
            <div class="list-message flex-cc" @click="openTalk(index)">
              <i class="iconfont fs16 c999 fwb" v-if="item.open">&#xe661;</i>
              <i class="iconfont fs15 c999 ml20">&#xe61a;</i>
              <span class="fs15 c999 mt-2">{{item.answer.length || 0}}</span>
              <!-- <img src="./../../../static/img/love.jpg" alt="love"> -->
            </div>
          </div>
          <div
            class="talk w100"
            :style="{ height: item.open ? ((item.answer.length * 31 + 70) + 'px') : 0 }"
          >
            <div class="talk-input flex-sc">
              <div class="flex-c w80">
                <img
                  :src="$crop(userInfo.avatar, 25, 25, time)"
                  alt
                  class="talk-img mr5 img-format"
                  v-if="userInfo.avatar"
                />
                <Icon type="ios-contact" class="cp talk-img mr5 fs25" v-else />
                <!-- <img :src="$crop(userInfo.avatar, 25, 25)" alt="" class="talk-img mr5 img-format" v-else/> -->
                <div class="bbt-box">
                  <input
                    type="text"
                    placeholder="想说点什么"
                    class="real-input ml5"
                    v-model.trim="replyContent"
                  />
                  <div class="bbt"></div>
                </div>
              </div>
              <div class="talk-btn fs15" @click="reply(item._id, index)">评论</div>
            </div>
            <div v-for="(talk, index) in item.answer" :key="talk.time" class="flex-sc talk-list">
              <div class="flex-c es1">
                <img
                  :src="$crop(talk.user_info.avatar, 22, 22, time)"
                  alt
                  class="talk-img mr5 img-format-min"
                />
                <span class="ml3 fs13 blue fwl mt4">{{talk.user_info.name}}:</span>
                <span class="ml10 fs13 c666 fwl mt4">{{talk.content}}</span>
              </div>
              <div class="talk-time fs12 c999 mt-2">
                {{timesAgo(talk.time)}}
                <span
                  class="ml10"
                ># {{item.answer && (item.answer .length - index) }}楼</span>
              </div>
            </div>
          </div>
        </div>
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
    <Page :current="1" :total="total" simple class="page flex-cc" @on-change='changeIndex' :page-size='5'/>
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
      timeStart: null
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
      this.$get("/artical", {
        pageIndex: index
      }).then(res => {
        if (res.code == 200) {
          this.articalList = res.data;
          this.total = res.total
          this.articalList.forEach((val, index) => {
            val.answer = val.answer.reverse();
          });
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

    openTalk(index) {
      const flag = this.articalList[index].open;
      if (flag) {
        this.articalList[index].open = false;
      } else {
        this.articalList.forEach((val, index) => {
          val.open && (val.open = false);
        });
        this.$set(this.articalList[index], "open", true);
      }
    },

    reply(_id, index) {
      if (!this.replyContent) {
        this.$Message.info("不能说空话哦");
        return;
      }
      this.$get("/artical/reply", {
        _id,
        content: this.replyContent
      }).then(res => {
        if (res.code == 200) {
          this.articalList[index].answer.unshift({
            user_info: this.userInfo,
            content: this.replyContent,
            time: new Date().getTime()
          });
          this.$Message.success(res.msg);
          this.replyContent = "";
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
    }
  },
  mounted() {
    this.getArticalList();
    this.getArticalSort();
    // this.$Message.info('MarkDown 语法即将支持')
    // this.$Notice.config({
    //   top: 60,
    //   duration: 2
    // });
    // this.$Notice.info({
    //   title: "不得已, 回复被删除啦 (ノへ￣、)"
    // });
  },
  beforeDestroy() {}
};
</script>


<style scoped lang='less'>
.home {
  width: 100%;
  // height: 100%;
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
// .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover,
// .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover {
//   background: linear-gradient(to right top, #4158d0, #c850c0);
// }

.content {
  // width: 1200px;
  // height: 1400px;
  // background-color: #ccc;
  width: 100%;
  // height: 100%;
  margin: 30px auto;
  margin-bottom: 0;
  // margin-bottom: 60px;
  // color: #4158d0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .c;
  .left {
    width: 276px;
    height: 100%; 
    margin-right: 28px;
    // background-color: #ccc;
    .info {
      width: 100%;
      // height: 400px;
      background-color: #fff;
      .info-head {
        width: 100%;
        height: 100px;
        position: relative;
        // background-color: #4158d0;
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
        // .info-name{}
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
            // color: #4158d0 !important;
            .c;
            // font-weight: bold;
          }
        }
      }
      .info-foot {
        width: 100%;
        height: 20px;
        // background-color: #4158d0;
        .bgc;
      }
    }
  }
  .mid {
    width: 94%;
    max-width: 600px;
    min-width: 325px;
    height: 100%;
    // background-color: #ccc;
    .head {
      width: 100%;
      height: 70px;
      box-shadow: 0 0 2px #ccc;
      // border-top: 6px solid #4158d0;
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
        // .bigger-1 {
        //   animation: small 0.4s linear;
        // }
        // @keyframes small {
        //    25% {
        //     font-size: 100px;
        //     color: rgba(255, 0, 0, 1);
        //     opacity: 1;
        //   }
        //   50% {
        //     font-size: 75px;
        //     color: rgba(255, 0, 0.66);
        //     opacity: 0.66;
        //   }
        //   75% {
        //     font-size: 50px;
        //     color: rgba(255, 0, 0, 0.33);
        //     opacity: 0.33;
        //   }
        //   100% {
        //     font-size: 24px;
        //     color: #ccc;
        //     opacity: 0;
        //   }
        // }
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
          // color: #666;
          opacity: 0.85;
        }
        .list-title {
          width: 100%;
          // height: 30px;
          line-height: 30px;
        }
        .list-content {
          width: 100%;
          // height: 60px;
          // padding: 8px 0 15px 0;
          margin: 8px 0 15px 0;
          text-indent: 2em;
          line-height: 150%;
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
          cursor: pointer;
          &:hover > i,
          &:hover > span:last-of-type {
            // color: #4158d0 !important;
            .c;
            // font-weight: bold;
            // font-size: 16px;
          }
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
.block {
  width: 100%;
  height: 300px;
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
    // background-color: #4158d0;
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
        // margin-left: 2em;
        // text-indent: -2em;
        &:hover {
          text-decoration: underline;
          // background-color: #000;
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
// .marquee{
//   width: 100%;
//   height: 50px;
//   line-height: 50px;
// }
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
    // display: none;
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