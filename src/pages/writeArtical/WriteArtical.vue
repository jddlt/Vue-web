<template>
  <div class="markdown">
    <Header></Header>
    <div class="title">
      <Input v-model="artical.title" class="my-input" >
          <span slot="prepend" class="fwb fs17 c999">文章标题</span>
          <span slot="append"><Button type="info" @click="sendArtical">发帖</Button></span>
      </Input>
    </div>
    <div class="w100 flex-cc mp30">
      <div class="container">
        <div class="mark-left" v-if='editArtical'>
          <textarea class="textarea bs" v-model='artical.content' placeholder="支持markdown语法, 如: # title"></textarea>
          <Button type="info" ghost size='small' class="preview" @click="showPreview(true)">预览</Button>
        </div>
        <!-- <div class="mark-right bs" ref='content'></div> -->
        <article class="mark-right bs markdown-body" v-if="previewArtical">
          <div class="block">
            <Button type="info" ghost size='small' class="preview" @click="showPreview(false)">返回</Button>
          </div>
          <VueShowdown 
            :markdown='artical.content'
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
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/headBar/HeadBar"; 
import { VueShowdown } from 'vue-showdown'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header,
    VueShowdown
  },
  data() {
    return {
      artical: {
        title: '',
        content: ''
      },
      previewArtical: true,
      editArtical: true
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleFirstEnter()
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
          this.$Message.success("发帖成功, 即将回到首页");
          setTimeout(() => {
            this.$router.go(-1)
          }, 1800)
          this.artical = { title: "", content: "" };
          // this.getArticalList();
        }
      });
    },
    showPreview(flag){
      this.previewArtical = flag
      this.editArtical = !flag
    },
    handleResize(e) {
        const width = e.currentTarget.innerWidth;
        if(width < 500) {
          this.previewArtical = false
          this.editArtical = true
        } else {
          this.previewArtical = true
          this.editArtical = true
        }
      // console.log(e.currentTarget.innerWidth);
    },
    handleFirstEnter() {
      const width = document.documentElement.clientWidth  || document.body.clientWidth 
      console.log('width', width);
      
      if(width < 500) {
          this.previewArtical = false
          this.editArtical = true
        } else {
          this.previewArtical = true
          this.editArtical = true
        }
    }
  }
};
</script> 

<style scoped lang='less'>
.title{
  width: 94%;
  max-width: 1200px;
  min-width: 325px;
  margin: 0 auto;
  margin-top: 15px;
  .my-input /deep/ input{
    font-size: 16px;
    font-weight: 600;
    text-indent: 0.4em;
  }
  .my-input /deep/ button{
    background-color: #2d8cf0;
    width: 100px;
    border-radius: 0;
    color: #fff;
    overflow: hidden;
    // margin-left: 2px;
    &:active{
      background-color: #1772b4;
    }
  }
  .input{
    width: 100%;
    height: 100;
  }
}
.container {
  width: 94%;
  max-width: 1200px;
  min-width: 325px;
  display: flex;
  .mark-left{
    flex: 1;
    position: relative;
    .preview{
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .textarea{
      width: 100%;
      height: calc(100vh - 210px);
      background-color: #eee;
      resize: none;
      font-size: 16px;
      font-weight: 200;
      border: none;
      outline: none;
      padding: 15px;
      padding-left: 18px;
      &:active{
        border: none;
        outline: none;
      }
    }
  }
  .mark-right{
    flex: 1;
    background-color: #fff;
    height: calc(100vh - 210px);
    overflow: auto;
    padding: 15px;
    padding-left: 18px;
    font-size: 16px;
    // position: relative;
    .preview{
      position: fixed;
      right: calc(3vw + 10px);
      bottom: 94px;
    }
  }
}
.mp30{
  margin-top: 15px;
  padding-bottom: 30px;
}

@media screen and (min-width: 500px) {
  .preview{
    display: none !important;
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
ul>li{
  list-style: initial;
}
ol>li{
  list-style: decimal;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>