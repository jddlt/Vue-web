<template>
  <div>
    <div class="box flex-cc my-bs" :style="style">
      <img :src="$crop(userInfo.avatar, 100, 100, time)" alt="" ref="img" accept="image/*" class="img" v-if="userInfo.avatar">
      <Icon type="ios-contact" class="cp no-avatar" v-else/>
      <div class="tips flex-cc fs15 cfff fwl">{{userInfo.avatar ? '更换头像' : '上传头像'}}</div>
      <input type="file" @input='fileChange($event)' class="input cp" title="">
    </div>
  </div>
</template>

<script>
import qiniu from 'qiniu'
import { ak, sk, bucket, host } from './../../../qiniu.config'
// import { mapGetters } from "vuex";
import { encode } from '@/util/util'
export default {
  data() {
    return {
      style: {
        'border-radius': '50%'
      },
      token: '',
      time: new Date().getTime()
    }
  },
  props: {
    flash: true,
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // ...mapGetters({userInfo: 'userInfo'})
  },
  watch: {
    
  },
  mounted() {
    const mac = new qiniu.auth.digest.Mac(ak, sk);
    const options = {
      scope: bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    this.token = putPolicy.uploadToken(mac);
  },
  methods: {
    fileChange(e) {
      const _this = this
      const file = e.target.files[0]
      if(!this.userInfo.emil) {
        this.$Message.error('未登录')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1200)
        return
      }
      if(!file) {
        this.$Message.info('已取消')
        return
      }
      this.$Modal.confirm({
        title: '警告',
        content: '请注意,该操作会立即修改头像,不受保存设置! 是否继续?',
        okText: '确定',
        cancelText: '取消',
        onCancel: () => {
          this.$Message.info('已取消')
          e.target.type = 'text'
          e.target.type = 'file'
        },
        onOk: () => {
          if(!/\.(png|jpe?g|gif)$/g.test(file.name)) {
            this.$Message.error('请上传图片')
          } else if(file.size > 2000000) {
            this.$Message.error('图片大于2M')
          } else {
            const Reader = new FileReader()
            Reader.readAsDataURL(file);
            Reader.addEventListener('load', function() {
              _this.putb64(this.result).then(res => {
                _this.$post('/upload', {
                  key: res
                }).then(res => {
                  // _this.getUserInfo()
                  _this.time = new Date().getTime()
                  _this.$Message.success('上传成功')
                  e.target.type = 'text'  // 牛逼
                  e.target.type = 'file'
                })
              })
            })
          }
        }
      })
    },
    putb64(result){
      console.log('this.userInfo._id', this.userInfo._id);
      return new Promise((resolve, reject) => {
        const pic = result.replace(/data:image\/.*;base64,/,'')
        const key = encode(this.userInfo._id)
        const url = `https://upload.qiniup.com/putb64/-1/key/${key}/`; //非华东空间需要根据注意事项 1 修改上传域名
        const xhr = new XMLHttpRequest();
        const _this = this
        xhr.onreadystatechange = function(){
          if (xhr.readyState==4){
            resolve(JSON.parse(xhr.responseText)['key'])
          }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", 'UpToken ' + _this.token);
        xhr.send(pic);
      })
    },
    getUserInfo() {
      this.$get("/userInfo", {}).then(msg => {
        // this.userInfo = msg.data || {};
        this.$store.dispatch("setUserInfo", msg.data);
      });
    }
  }
}
</script>

<style scoped lang='less'>
  .box{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    // border: 1px solid #ccc;
    background-color: #fff;
    // border: 12px solid #fff;
    overflow: hidden;
    &:hover .tips{
      z-index: 1;
      cursor: pointer;
    }
    .no-avatar{
      position: absolute;
      // width: 100px;
      // height: 100px;
      // font-size: 100%;
      .fs95
    }
    .input{
      width: 100px;
      height: 100px;
      border: none;
      outline: none;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    .img{
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
    }
    .tips{
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 100px;
      background-color: rgba(0,0,0,0.3);
      z-index: -1
    }
  }
  .my-bs{
    box-shadow: 0 0 5px 3px #ccc;
  }
  .fs95{
    font-size: 95px;
  }
  input{
    cursor: pointer !important;
  }
  // /deep/.ivu-modal-confirm-head{
  //   padding: 0 !important;
  //   text-align: center !important;
  // }
  // /deep/.ivu-modal-body>.ivu-modal-confirm>.ivu-modal-confirm-body{
  //   padding-left: 0 !important;
  // }
  // /deep/.ivu-modal-body>.ivu-modal-confirm>.ivu-modal-confirm-footer{ 
  //   text-align: center !important;
  // }
</style>>