<template>
  <div>
    <div class="fullpage1" :class="{leave:fullL}">
      <p v-show="titleE" class="beginTitle1" :class="{titleLeave:titleL1}">title1</p>
      <p v-show="titleE" class="beginTitle2" :class="{titleLeave:titleL2}">title2</p>
    </div>
    <div class="fullpage2">
      <div class="picTop">
        <span>Index</span>
        <span>-</span>
        <span>Thumbs</span>
      </div>
      <div class="imageContent">
        <img :src="activeSrc" alt="">
      </div>
      <p class="imageIndex" @click="goNext" :class="{imageIndexBottom:imageIndexB}">{{groupName}} {{groupIndex}}/{{groupTotal}}</p>
    </div>
  </div>
</template>

<script>
  import imgConfig from '../images/config'
  export default {
    name: "wap-home",
    data() {
      return {
        fullL: false,
        titleE:false,
        titleL1:false,
        titleL2:false,
        activeGroupIndex:0,
        groupName:imgConfig[0].name,
        groupIndex:1,
        groupTotal:imgConfig[0].imgList.length,
        imageIndexB:false,
        activeSrc:imgConfig[0].imgList[0]
      }
    },
    mounted() {
      let that = this;
      setTimeout(function () {
        that.titleE = true;
        that.titleLeave();
      }, 500)
    },
    methods:{
      titleLeave(){
        let that=this;
        setTimeout(function () {
          that.titleL1 = true;
          setTimeout(function () {
            that.titleL2 = true;
            that.fullLeave();
          },200)
        }, 1000)
      },
      fullLeave(){
        let that=this;
        setTimeout(function () {
          that.fullL=true;
          that.imageIndexBottom()
        },500)
      },
      imageIndexBottom(){
        let that=this;
        setTimeout(function () {
          that.imageIndexB=true;
        },1000)
      },
      goNext(){

      }
    }


  }
</script>

<style scoped>
  .fullpage1 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 2;
  }

  .leave {
    height: 0;
    transition: height 1s;
  }
  .beginTitle1{
    position: absolute;
    top: 50%;
    left: 20%;
    color:white;
    font-size: 12px;
    opacity: 1;
    transform:translate(-50%,-50%);
  }
  .beginTitle2{
    position: absolute;
    top:50%;
    left: 60%;
    color:white;
    font-size: 12px;
    opacity: 1;
    transform:translate(-50%,-50%);
  }
  .titleLeave{
    top: 40%;
    opacity: 0;
    transition: 1s ;
  }
  .fullpage2 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }
  .imageIndex{
    position: absolute;
    bottom:45%;
    left:50%;
    width:100%;
    height: 50px;
    line-height:50px;
    transform:translate(-50%,-50%);
  }
  .imageIndexBottom{
    bottom:0;
    transform:translate(-50%,-50%);
    transition: 1s ;
  }
  .picTop{
    position: absolute;
    height: 10%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:Center;
  }
  .imageContent{
    position: absolute;
    width: 100%;
    padding: 0 20px;
    height: 80%;
    top:10%;
    overflow: hidden;
  }
  .imageContent img{
    max-width: 100%;
    height: auto;
  }
</style>
