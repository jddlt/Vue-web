<template>
  <div class="">
    <head-bar></head-bar>
    <div class="artical">
      <div class="content bs">
          <div class="list-head flex-sc">
            <div class="list-head-left flex-sc" @click="showInfo(articalInfo.author)">
              <img :src="$crop((articalInfo.author && articalInfo.author.avatar), 45, 45, time)" alt class="list-img cp bs" />
              <div class="list-name flex-c-s">
                <span class="fs14 c333 cp fwb">{{articalInfo.author && articalInfo.author.name}}</span>
                <span class="lh100">
                  <i class="iconfont fs11">&#xe629;</i>
                  <span class="c999 fs13 lh100 fwl">{{toTime(articalInfo.create_time)}}</span>
                  <span class="c999 fs13 lh100 fwl ml5">{{articalInfo.looks || 0}}人阅读</span>
                </span>
              </div>
            </div>
            <i :class="'list-like iconfont fs22 cccc flex-cc usn' + ((bigger && (articalInfo.likes && articalInfo.likes.includes(userInfo._id))) ? ' bigger-2' : '') + (articalInfo.likes && articalInfo.likes.includes(userInfo._id) ? ' red' : '')" title='点赞' @click="iLike(articalInfo._id, articalInfo.likes)">&#xe61d;</i>
          </div>
          <div class="artical-title fs-big fwb tc">
            {{articalInfo.title}}
          </div>
          <!-- <div class="artical-content">
            {{articalInfo.content}}
          </div> -->
          <article class="artical-content markdown-body">
            <VueShowdown 
              :markdown='articalInfo.content || ""'
              flavor="github"
              :options="{ 
                  emoji: true, 
                  strikethrough: true,
                  table: true,
                  tasklists: true,
                  smoothLivePreview: true,
                  smartIndentationFix: true,
                  openLinksInNewWindow: true,
                  backslashEscapesHTMLTags: true,
                  ghCompatibleHeaderId: true
                }"
            ></VueShowdown>
            <div class="flex mt30">
              <div v-if="articalInfo.personal" class="mr30">
                <span class="c000 fs16 mr10">性质: </span>
                <i v-if="articalInfo.personal === 'personal'" class="iconfont fwl d fs23 va-3">&#xe659;</i>
                <i v-if="articalInfo.personal === 'public'" class="iconfont fwl o fs23 va-3">&#xe601;</i>
              </div>
              <div v-if="articalInfo.type">
                <span class="c000 fs15 mr10">类别: </span>
                <router-link :to="'/?type=' + articalInfo.type" tag="a">{{articalInfo.type}}</router-link>
              </div>
            </div>
        </article>
          <Divider :dashed= true>全文完</Divider>
          <div class="message">
            <Message :talkList='talkList' :id='id'></Message>
          </div>
      </div>
      <!-- <div class="info">

      </div> -->
    </div>
    <InfoDialog :isOpen='isOpen' :userInfo='showUserInfo' :time='time'></InfoDialog>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import HeadBar from '@/components/headBar/HeadBar'
import Footer from '@/components/footer/Footer'
import Message from '@/components/message/Message'
import { mapGetters } from 'vuex'
import { VueShowdown } from 'vue-showdown'
import { toTime } from '@/util/formatTime.js'
import InfoDialog from "@/components/infoDialog/InfoDialog";
export default {
  components: {
    HeadBar,
    Footer,
    Message,
    VueShowdown,
    InfoDialog
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      time: new Date().getTime(),
      articalInfo: {},
      talkList: [],
      id: '',
      isOpen: false,
      showUserInfo: {},
      times: 0,
      timeStart: null,
      bigger: NaN,
      timer: 0
    };
  },
  mounted() {
    this.getArticalDetail()
  },
  methods: {
    toTime(date) {
      return toTime(date)
    },
    getArticalDetail() {
      this.$get('/artical/detail', {
          _id: this.$route.query.id
      }).then(res => {
        if(res.code == 200) {
            this.articalInfo = res.data;
            this.id = this.$route.query.id;
            this.talkList = (res.data.answer && res.data.answer.reverse()) || []
          }
        })
      },
      showInfo(author) {
        this.isOpen = true
        this.showUserInfo = author
      },

      closeInfo() {
        this.isOpen = false
      },

      iLike(id, likes) {
      this.times++
      this.timeStart || (this.timeStart = new Date().getTime());
      if(this.times == 4) {
        if((Date.now() - this.timeStart) < 2500) {
          this.$Message.error('你点这么快干嘛??')
        }
        this.times = 0
        this.timeStart = null
      }
      clearTimeout(this.timer)
      this.bigger = true;
      this.$get('/artical/like', {
        id,
        is_like: !likes.includes(this.userInfo._id)
      }).then(res => {
        if(res.code == 200) {
          this.getArticalDetail()
          this.$Message.info(res.msg)
        }
      })
      this.timer = setTimeout(() => {
        this.bigger = false
        clearTimeout(this.timer)
      }, 500)
    }
  },
  beforeDestroy() {}
};
</script>

<style scoped lang='less'>
.artical{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  // margin-top: 30px;
  .content{
    width: 94%;
    max-width: 900px;
    min-width: 325px;
    padding: 8px 25px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    margin: 35px 0;
    // text-indent: 2em;
    overflow: hidden;
    
    .artical-title{
      width: 100%;
      margin-top: 20px;
      user-select: text;
    }
    .artical-content{
      width: 100%;
      min-height: 400px;
      font-size: 15px;
      user-select: text;
      // font-weight: 400;
      // line-height: 26px;
      // white-space: pre-wrap;
    }
    .list-head {
        width: 100%;
        height: 70px;
        .list-head-left {
          width: 120px;
          height: 100%;
          .list-img {
            width: 45px !important;
            min-width: 45px !important;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
          }
          .list-name {
            height: 38px;
            width: 150px;
            margin-top: 2px;
            span {
              width: 300px;
            }
          }
        }
        .list-like {
          width: 32px;
          height: 100%;
          cursor: pointer;
          &:hover {
            // animation: bigger 0.5s linear;
            // animation-fill-mode: forwards;
            color: red;
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
  }
  .info{
    width: 275px;
    margin-left: 28px;
    background-color: #fff;
  }
}
.fs-big{
  font-size: 23px;
}
@media screen and (max-width: 1250px) {
  .info{
    display: none;
  }
}
@media screen and (max-width: 400px) {
  .info{
    display: none;
  }
  .artical, .content{
    border-radius: 4px !important;
  }
  .content{
    margin-top: 25px !important;
  }
}
</style>
<style>
@import url('github-markdown-css');
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 20px;
    /* padding-right: 25px; */
}
*{
  user-select: text;
}
ul>li{
  list-style: initial;
}
ol>li{
  list-style: decimal;
}
@media (max-width: 767px) {
    .markdown-body {
        padding: 10px 0px;
    }
    .content{
      padding: 0 15px !important;
    }
}
</style>