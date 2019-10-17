<template>
  <div class="markdown">
    <Header></Header>
    <div class="title">
      <Input v-model="artical.title" class="my-input" placeholder="文章标题">
          <!-- <span slot="prepend" class="fwb fs17 c999">文章标题</span> -->
          <Select slot="prepend" v-model="type" size="small" style="width:100px" placeholder="类别">
            <Option v-for="item in typeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <span slot="append"><Button type="info" @click="sendArtical">发帖</Button></span>
      </Input>
      <div class="mt10 flec-c oh">
        <Tooltip content="支持Markdown语法" class="mr20 vl10 ml20">
            <i class="iconfont fs23">&#xe6eb;</i>
        </Tooltip>
        <RadioGroup v-model="personal" size='large' class="mt10">
          <Radio label="personal" :disabled='isSkill'>
              <i :class="'iconfont fs23 va-4' + (isSkill ? ' cccc' : ' d')">&#xe659;</i>
              <!-- <span>原创</span> -->
          </Radio>
          <Radio label="public" :disabled='isSkill'>
              <i :class="'iconfont fs23 va-4' + (isSkill ? ' cccc' : ' o')">&#xe601;</i>
              <!-- <span>转载</span> -->
          </Radio>
      </RadioGroup>
      </div>
    </div>
    <div class="w100 flex-cc mp30">
      <div class="container">
        <div class="mark-left" v-if='editArtical'>
          <textarea class="textarea bs" v-model='artical.content' placeholder="文章内容 
支持markdown语法, 如: # title"></textarea>
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
      editArtical: true,
      typeList: ['闲聊', 'Javascript', 'Vue', 'React', 'Webpack', 'Markdown', 'Jquery', 'Node', 'Python', 'Css', 'Git', '其他'],
      type: '',
      personal: 'personal',
      isSkill: true
    };
  },
  watch: {
    type(newVal, oldVal) {
      if(newVal === '闲聊' || newVal === '其他') {
        this.isSkill = true
      } else {
        this.isSkill = false
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    const width = document.documentElement.clientWidth  || document.body.clientWidth
    if(width > 500) {
      window.addEventListener('resize', this.handleResize, false);
    }
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
      if(!this.type) {
        this.$Message.info("请选择文章分类");
        return;
      }
      if(this.type === '闲聊' || this.type === '其他') {
        this.$post("/artical/sendArtical", {
          title,
          content,
          author: JSON.stringify(this.userInfo),
          type: this.type === '其他' ? '' : this.type,
          personal: ''
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
      } else {
         this.$post("/artical/sendArtical", {
          title,
          content,
          author: JSON.stringify(this.userInfo),
          type: this.type,
          personal: this.personal
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
      }
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
  },
  destroyed() {
    console.log('awsl');
    window.removeEventListener('resize', this.handleResize, false)
  },
    beforeRouteLeave(to,from,next){
      console.log('this', this);
      
      if(this.artical.title || this.artical.content) {
        this.$Modal.confirm({
          title: '提醒',
          content: '您有编译内容未发布, 确定退出吗, 目前退出无法自动保存!',
          okText: '确定退出',
          cancelText: '返回',
          onOk() {
            next()
          }
        })
      } else {
        next()
      }
    }
};
</script> 

<style scoped lang='less'>
.title{
  width: 94%;
  max-width: 1300px;
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
  max-width: 1300px;
  min-width: 325px;
  height: auto;
  display: flex;
  .mark-left{
    flex: 1;
    position: relative;
    .preview{
      position: absolute;
      height: 100%;
      right: 10px;
      bottom: 10px;
    }
    .textarea{
      width: 100%;
      height: 100%;
      background-color: #eee;
      // resize: none;
      min-height: 700px;
      font-size: 16px;
      font-weight: 200;
      border: none;
      outline: none;
      padding: 15px;
      padding-left: 18px;
      box-sizing: border-box;
      &:active{
        border: none;
        outline: none;
      }
    }
  }
  .mark-right{
    flex: 1;
    background-color: #fff;
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
  padding-bottom: 25px;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
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
.vl10{
  vertical-align: -9px;
}
.d{
  color: #D81E06;
}
.o{
  color: #0099FF;
}
@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>