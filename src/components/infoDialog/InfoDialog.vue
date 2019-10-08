<template>
<div :class="'dia bss' + (isOpen ? '' : ' scale')">
    <div class="left">
        <div class="info bs">
          <div class="info-head flex-cc">
            <div class="info-img-box flex-cc">
              <!-- <upload :avatar="userInfo.avatar" /> -->
              <img :src="$crop(userInfo.avatar, 93, 93, time)" alt="" v-if='userInfo.name' class="info-img bss cp">
              <Icon type="ios-contact" class='fs95 cp' v-else/>
            </div>
          </div>
          <div class="info-body flex-c-sc">
              <h2>{{userInfo.name || '--'}}</h2>
            <div class="info-name c000 fwb fs20">
                <div class="fs16 tc">
                    <p class="mt5 mb5 fs15">{{userInfo.emil || '--'}}</p>
                    <p class="fs15 mb10 mt10">{{userInfo.sex || '人妖?'}}<span class="item-class fs15">{{userInfo.label || '萌萌哒'}}</span></p>
                    <p class="c666 fs12 mt15">{{userInfo.tips || '该用户暂未填写签名'}}</p>
                </div>
            </div>
            <!-- <div class="info-mark c999 fwl fs16">{{userInfo.name ? (userInfo.tips ? userInfo.tips : '该用户暂未填写签名') : '你还没登陆呢'}}</div> -->

          </div>
        <ButtonGroup class="flex mt10 w100">
            <Button class="flex-1" @click="close">关闭</Button>
            <Button type="primary" class="flex-1" @click="addFriend">加好友</Button>
        </ButtonGroup>
          <div class="info-foot"></div>
        </div>
      </div>
</div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        },
        isOpen: {
            type: Boolean,
            default: false
        },
        time: Number
    },
    watch: {
      userInfo(o) {
        console.log(o)
      }
    },
    methods: {
        close() {
            this.$parent.closeInfo && this.$parent.closeInfo()
        },
        addFriend() {
            this.$Message.info('暂不支持加好友')
        }
    }
}
</script>

<style scoped lang='less'>
.dia{
    width: 260px;
    position: fixed; 
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: -130px;
    overflow: hidden;
    border-radius: 6px;
    transition: all 0.2s;
}
.scale{
    transform: translateY(-50%) scale(0) 
}
.left {
    width: 100%;
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
        background: url('https://img.mrpzx.cn/infoBg.jpg') no-repeat center;
        background-size: cover;
        ;
        .info-img-box {
          width: 93px;
        //   height: 100px;
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
        // height: 120px;
        padding: 30px 12px 0 12px;
        box-sizing: border-box;
        // border-bottom: 1px solid #ccc;
        margin-top: 20px;
        margin-bottom: 17px;
        line-height: 30px;
        // .info-name{}
      }
      .info-message {
        width: 100%;
        // height: 60px;
        // padding: 0 30px;
        box-sizing: border-box;
        .message-item {
          height: 100%;
          cursor: pointer;
          transition: all 0.3s;
          &:hover > i,
          &:hover > span {
            // color: #4158d0 !important;
            .c;
            font-weight: bold;
          }
        }
      }
      .info-foot {
        width: 100%;
        height: 20px;
        background: url('https://img.mrpzx.cn/infoBg.jpg') no-repeat left top;
      }
    }
  }
.c {
  color: #2d8cf0;
}
.bgc {
  background-color: #2d8cf0;
}
.bss{
  box-shadow: 0 0 3px  #2d8cf0 !important;
}
.item-class{
    padding: 4px 6px;
    border-radius: 7px;
    margin-left: 26px;
    color: #3c763d;
    background-color: #dff0d8;
}
// .mb15{
//     margin-bottom: 15px;
// }
.mt15{
    margin-top: 15px;
}
</style>