<template>
  <div>
    <div class="box flex-cc" :style="style">
      <img :src="$crop(imgurl, 92, 92)" alt="" ref="img" accept="image/*" class="img" v-if="avatar && imgurl">
      <Icon type="ios-contact" class="cp no-avatar" v-else/>
      <div class="tips flex-cc fs15 cfff fwl">{{imgurl ? '更换头像' : '上传头像'}}</div>
      <input type="file" @change='fileChange($event)' class="input cp" title="">
    </div>
  </div>
</template>

<script>
import qiniu from 'qiniu'
import { ak, sk, bucket, host } from './../../../qiniu.config'
import { mapGetters } from "vuex";
import { encode } from '@/util/util'
export default {
  data() {
    return {
      imgurl: this.avatar,
      style: {
        'border-radius': '50%',
        "width": this.imgurl ? '92px' : '100px',
        "height": this.imgurl ? '92px' : '100px',
      },
      token: ''
    }
  },
  props: {
    avatar: ''
  },
  computed: {
    ...mapGetters({user: 'userInfo'})
  },
  watch: {
    avatar(){
      this.imgurl = this.avatar || '';
      this.style = {
        'border-radius': '50%',
        "width": this.avatar ? '92px' : '100px',
        "height": this.avatar ? '92px' : '100px',
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
      // this.imgurl = this.user.avatar || '';
    // })
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
      if(!this.user.avatar) {
        this.$Message.error('未登录')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1200)
        return
      }
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
              _this.imgurl = host + _this.user._id
              _this.$Message.success('更新成功,即将为您刷新页面')
              setTimeout(() => {
                window.location.reload();
              }, 1600)
            })
          })
          // _this.$refs.img.src = this.result
        })
      }
    },
    putb64(result){
      console.log('this.user._id', this.user._id);
      return new Promise((resolve, reject) => {
        const pic = result.replace(/data:image\/.*;base64,/,'')
        const key = encode(this.user._id)
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
    }
  }
}
</script>

<style scoped lang='less'>
  .box{
    width: 92px;
    height: 92px;
    border-radius: 10px;
    position: relative;
    // border: 1px solid #ccc;
    background-color: #fff;
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
  .fs95{
    font-size: 95px;
  }
  input{
    cursor: pointer !important;
  }
</style>>