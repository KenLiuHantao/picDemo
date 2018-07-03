<template>
  <div>
    <div class="fullpage1" :class="{leave:fullL}">
      <p v-show="titleE" class="beginTitle1" :class="{titleLeave:titleL1}">Jack Davison</p>
      <p v-show="titleE" class="beginTitle2" :class="{titleLeave:titleL2}">Photo Grapher</p>
    </div>
    <div class="fullpage2" :class="{indexOpen:rightOpen}">
      <div class="picTop">
        <span @click="openRightIndex">Index</span>
        <span class="midLine1"></span>
        <span>Thumbs</span>
      </div>
      <div class="imageContent"  @click="goOther">
          <img :src="activeSrc" alt="">

      </div>
      <p class="imageIndex"  @click="goOther" :class="{imageIndexBottom:imageIndexB}">{{groupName}} {{groupIndex+1}}/{{groupTotal}}</p>
    </div>
    <div class="rightIndex" :class="{rightIndexActive:rightOpen}">
      <div class="rightTitle" >
        <span>Email</span>
        <span class="midLine2"></span>
        <span>Instagram</span>
        <span class="midLine2"></span>
        <span style="font-weight: bold">Mini Title</span>
        <span class="close">
          <svg @click="closeRightIndex" viewBox="0 0 45 45"><title>Close 1.1</title><path d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path><path d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path></svg>
        </span>
      </div>
       <div class="groupDiv">
         <ul>
           <li v-for="item in imgConfig" @click="gotoIndex(item)">
             {{item.name}} ({{item.imgList.length}})
           </li>
         </ul>
       </div>
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
        rightOpen:false,
        activeGroupIndex:0,
        imgConfig:imgConfig,
        groupIndex:0,
        imgIndex:0,
        imageIndexB:false,

      }
    },
    computed:{
      groupName(){
        return this.imgConfig[this.groupIndex].name
      },
      groupTotal(){
        return this.imgConfig[this.groupIndex].imgList.length
      },
      activeSrc(){
        return this.imgConfig[this.groupIndex].imgList[this.imgIndex]
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
      goOther(e){
        let width=window.screen.width;
        if(e.offsetX>width/2){
          this.goNext();
        }else{
          this.goBefore();
        }
      },
      goNext(){
        if(this.imgIndex<this.imgConfig[this.groupIndex].imgList.length-1){
          this.imgIndex++
        }
      },
      goBefore(){
        if(this.imgIndex>0){
          this.imgIndex--
        }
      },
      gotoIndex(item){

      },
      openRightIndex(){
        this.rightOpen=true;
      },
      closeRightIndex(){
        this.rightOpen=false;
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
    left: 25%;
    color:white;
    font-size: 14px;
    opacity: 1;
    font-weight: bold;
    transform:translate(-50%,-50%);
  }
  .beginTitle2{
    position: absolute;
    top:50%;
    left: 60%;
    color:white;
    font-size: 14px;
    opacity: 1;
    /*font-weight: bold;*/
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
    transform: translate3d(0px, 0px, 0px);
    transition: 1s;
  }
  .imageIndex{
    font-weight: bold;
    position: absolute;
    bottom:45%;
    left:50%;
    width:100%;
    height: 50px;
    line-height:50px;
    transform:translate(-50%,-50%);
  }
  .imageIndexBottom{
    bottom:-20px;
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
  .picTop span{
    font-size: 12px;
    font-weight: bolder;
    font-family: Untitled Sans Medium,Helvetica,Arial,sans-serif;
    font-style: normal;
  }
  .picTop .midLine1{
    display: inline-block;
    width: 19px;
    height: 1px;
    background-color: #fff;
    margin: 0 5px;
    border-bottom: 1px black solid;
    top: 1px;
  }
  .imageContent{
    position: absolute;
    width: 100%;
    height: 80%;
    top:10%;
    overflow: hidden;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    transition: 1s;
  }
  .indexOpen{
    transform: translate(-25%, 0%);
    transition: 1s;
  }
  .imageContent img{
    width: calc(100% - 40px);
    height:auto;
    will-change: opacity,transform;
    opacity: 1;
    top:0px;
    bottom:0px;
    left:0px;
    right:0;
    margin:auto;
    position: absolute;
  }
  .rightIndex{
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100%;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    width: 100%;
    z-index: 6;
    top: 0;
    left: 0;
    background: white;
    cursor: auto;
    transform: translate(100%, 0%) matrix(1, 0, 0, 1, 0, 0);
    transition: 1s;
  }
  .rightIndexActive{
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition: 1s;
  }
  .rightTitle{
    z-index: 0;
    opacity: 1;
    padding: 0;
    top: 0;
    height: 80px;
    line-height: 80px;
    width: 86%;
    left: 7%;
    position: absolute;
    font-size: 12px;
    text-align: left;
  }
  .rightTitle .midLine2{
    display: inline-block;
    width: 10px;
    height: 1px;
    background-color: #fff;
    margin: 0 5px;
    border-top: 1px black solid;
    top: 1px;
  }
  .close{
    float: right;
    margin-top: 5px;
  }
  .close svg{
    width: 18px;
    height: 18px;
  }
  .groupDiv{
    width: 86%;
    left: 7%;
    position: relative;
    overflow: hidden;
    padding-left: 6px;
  }
  .groupDiv li{
    text-align: left;
    font-size:14px;
    line-height: 2.76923;
    letter-spacing: 0;
  }
</style>
