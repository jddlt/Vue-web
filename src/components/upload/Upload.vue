<template>
  <div>
    <div class="box flex-cc" :style="style">
      <img src="" alt="" ref="img" accept="image/*" class="img">
      <Icon type="ios-contact" class="cp no-avatar" v-if="!imgurl"/>
      <div class="tips flex-cc fs15 cfff fwl">{{imgurl ? '修改头像' : '上传头像'}}</div>
      <input type="file" @change='fileChange($event)' class="input cp">
    </div>
  </div>
</template>

<script>
import qiniu from 'qiniu'
import { ak, sk, bucket } from './../../../qiniu.config'
export default {
  data() {
    return {
      imgurl: '',
      style: {
        'border-radius': '50%'
      },
      token: ''
    }
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
      if(!/\.(png|jpe?g|gif)$/g.test(file.name)) {
        this.$Message.error('请上传图片')
      } else if(file.size > 2000000) {
        this.$Message.error('图片大于2M')
      } else {
        const Reader = new FileReader()
        Reader.readAsDataURL(file);
        Reader.addEventListener('load', function() {
          console.log(this.result);
          _this.putb64(this.result).then(res => {
            _this.$post('/upload', {
              hash: res
            }).then(res => {
              console.log('res', res);
            })
          })
          _this.$refs.img.src = this.result
          _this.imgurl = true
        })
      }
    },
    putb64(result){
      return new Promise((resolve, reject) => {
        const pic = result.replace(/data:image\/.*;base64,/,'')
        const url = "http://upload.qiniup.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
        const xhr = new XMLHttpRequest();
        const _this = this
        xhr.onreadystatechange = function(){
          if (xhr.readyState==4){
            console.log('xhr.responseText.hash', JSON.parse(xhr.responseText)['hash']);
            resolve(JSON.parse(xhr.responseText)['hash'])
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
    width: 100px;
    height: 100px;
    border-radius: 10px;
    position: relative;
    border: 1px solid #ccc;
    background-color: #eee;
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
      background-color: rgba(0,0,0,0.5);
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