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
                  <span class="c999 fs13 lh100 fwl">1人阅读</span>
                </span>
              </div>
            </div>
            <i class="list-like iconfont fs22 cccc flex-cc">&#xe61d;</i>
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
      showUserInfo: {}
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
            console.log('this.articalInfo', this.articalInfo);
            
            this.id = this.$route.query.id;
            this.talkList = (res.data.answer && res.data.answer.reverse()) || []
          }
        })
      },
      showInfo(author) {
        this.isOpen = true,
        this.showUserInfo = author
      },

      closeInfo() {
        this.isOpen = false
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
            animation: bigger 0.5s linear;
            animation-fill-mode: forwards;
          }
        }
        @keyframes bigger {
          25% {
            font-size: 32px;
            color: rgba(255, 0, 0, 0.25);
          }
          50% {
            font-size: 24px;
            color: rgba(255, 0, 0);
          }
          75% {
            font-size: 28px;
            color: rgba(255, 0, 0, 0.75);
          }
          100% {
            font-size: 24px;
            color: rgb(255, 0, 0);
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
    padding: 45px;
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