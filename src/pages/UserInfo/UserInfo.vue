<!-- 用户中心 -->
<template>
    <div>
        <!-- <wbc-nav></wbc-nav> -->
        <HeadBar></HeadBar>
        <div class="container">
            <div class="tcommonBox">
                <p class="w100 tc fs22 fwb"> 个人资料 </p>
                <section>
                    <ul class="userInfoBox">
                        <li class="avatarlist flex-cc mt20">
                            <!-- <span class="leftTitle">头像</span> -->
                            <Upload 
                                class="avatar-uploader"
                                :userInfo = userInfo
                            ></Upload>
                             <!-- <div class="flex-cc mt20"> <Upload></Upload> </div> -->
                        </li>
                        <li class="username flex-cc">
                            <span class="leftTitle">昵称</span>
                            <Input v-model="userInfo.name" placeholder="昵称" class="flex-1" />
                        </li>
                        <li>
                            <span class="leftTitle">电子邮件</span>
                            <span>{{userInfo.emil || '不见了 w(ﾟДﾟ)w!'}}</span>
                        </li>
                        <li>
                            <span class="leftTitle">性别</span>
                            <RadioGroup v-model="sex">
                              <Radio class="radio" label="未知">未知</Radio>
                              <Radio class="radio" label="男">男</Radio>
                              <Radio class="radio" label="女">女</Radio>
                            </RadioGroup>
                        </li>
                        <li>
                            <span class="leftTitle">个性标签</span>
                            <RadioGroup v-model="label">
                                <Radio v-for="(item,index) in usertab" :key="'usertab'+index" :label="item" >{{item}}</Radio>
                            </RadioGroup>
                        </li>
                       <li class="username flex-cc">
                            <span class="leftTitle">个性签名</span>
                            <Input v-model="userInfo.tips" placeholder="这个人思想有问题,不写签名" class="flex-1" />
                        </li>
                        <li>
                            <span class="leftTitle">是否展示友链</span>
                            <i-switch size="large" v-model="state" disabled>
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                            <span class="c999 fs12 fwl">暂未开放</span>
                        </li>
                        <li v-show="state">
                            <span class="leftTitle">网站名称</span>
                            <Input v-model="userInfoObj.name" placeholder="网站名称" /><i v-show="state" class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <li v-show="state">
                            <span class="leftTitle">网站地址</span>
                            <Input v-model="userInfoObj.url" placeholder="网站" value="userWeb" /> <i v-show="state" class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <li v-show="state">
                            <span class="leftTitle">网站简介</span>
                            <Input
                              type="textarea"
                              :rows="3"
                              placeholder="请输入内容"
                              v-model="userInfoObj.description" />
                            <i v-show="state" class="fa fa-wa fa-asterisk"></i>
                        </li>
                        <li  v-show="state" class="avatarlist bb">
                            <span class="leftTitle">网站logo</span>
                            <Upload class="avatar-uploader"></Upload>
                        </li>
                    </ul>
                    <div class="saveInfobtn flex-cc">
                        <Button type="info" @click="goback">返 回</Button>
                        <Button type="info" class="ml20" @click="saveUserInfo">保 存</Button>
                    </div>
                </section>
            </div>
        </div>
        
    </div>
</template>

<script>
import HeadBar from '@/components/headBar/HeadBar'
import Footer from '@/components/footer/Footer'
import { mapGetters } from 'vuex'
import Upload from '@/components/upload/Upload'
    export default {
        name: 'UserInfo',
        data() { //选项 / 数据
            return {
                userInfoObj: {},
                state: false, //是否展示友链开关
                // sex: userInfo.sex || '未知',
                // label: userInfo.label || '天然呆',
                sex: '',
                label: '',
                usertab:[//用户标签
                    "天然呆",
                    "小萌新",
                    "学霸",
                    "萌萌哒",
                    "技术宅",
                    "忠实粉"
                ]
            }
        },
        computed: {
            ...mapGetters(['userInfo']),
            // sex: function() {
            //     return (this.userInfo.sex || '未知')
            // },
            // label: function(){
            //     return (this.userInfo.label || '天然呆')
            // }
        },
        mounted() {
            this.sex = this.userInfo.sex || '未知'
            this.label = this.userInfo.label || '天然呆'
        },
        methods: { //事件处理器
            saveInfoFun: function(){//保存编辑的用户信息
                if(!that.userInfo.username){ //昵称为必填
                     that.$message.error('昵称为必填项，请填写昵称');
                     return;
                }
            },
            goback() {
                this.$router.go(-1)
            },
            saveUserInfo(){
                this.$post('/editUserInfo', {
                    ...this.userInfo,
                    sex: this.sex,
                    label: this.label
                }).then(res => {
                    if(res.code == 200){
                        this.$Message.success('保存成功')
                        setTimeout(() => {
                            this.$router.go(-1)
                        },2000)
                    }
                })
            }
        },
        components: { //定义组件
            HeadBar,
            Footer,
            Upload
        },
        watch: {},
        created() {}
    }
</script>

<style scoped lang='less'>
.container{
    width: 92%;
    max-width: 900px;
    min-width: 325px;
    margin: 30px auto;
}
.userInfoBox .avatarlist{
    position: relative;
}

.avatar-uploader {
    display: inline-block;
    vertical-align: top;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }
 
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    position: absolute;
    top:0;
    left:0;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
.gotoEdit{
    font-size: 15px;
    float:right;
    cursor: pointer;
    color:#999;
}
.gotoEdit:hover {
    color:#333;
}
/*个人设置*/
.userInfoBox .leftTitle{
    display: inline-block;
    width:100px;
    padding: 10px 0;
}
.userInfoBox .rightInner{
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
}
.userInfoBox li{
    padding:20px;
    border-bottom: 1px solid #ddd;
}
.userInfoBox li:first-child{
    border-bottom: 1px solid transparent;
}
.saveInfobtn{
    margin: 20px 0;
    // text-align: center;
}
.saveInfobtn a{
    color:#fff;
    padding:6px 20px;
    margin:5px 10px;
    border-radius: 5px;
    font-size: 14px;
}
.userInfoBox .fa-asterisk{
    color: #DF2050;
}
</style>
