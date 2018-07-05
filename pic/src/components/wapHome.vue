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
        <span @click="OpenIndex">Thumbs</span>
      </div>

      <div class="imageContent"  @click="goOther">
        <div v-show="whiteShow" class="whitePage" :class="{whiteOut:whiteOut}"></div>
        <img :src="activeSrc" alt="">
      </div>
      <p class="imageIndex" @click="goOther" :class="{imageIndexBottom:imageIndexB}">{{groupName}}
        {{imgIndex+1}}/{{groupTotal}}</p>
    </div>
    <div class="rightIndex" :class="{rightIndexActive:rightOpen}">
      <div class="rightTitle">
        <span>Email</span>
        <span class="midLine2"></span>
        <span>Instagram</span>
        <span class="midLine2"></span>
        <span style="font-weight: bold">Mini Title</span>
        <span class="close">
          <svg @click="closeRightIndex" viewBox="0 0 45 45"><title>Close 1.1</title><path
            d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path><path
            d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path></svg>
        </span>
      </div>
      <div class="groupDiv">
        <ul>
          <li v-for="item,index in imgConfig" @click="gotoIndex(item,index)" :class="{bold:index==groupIndex}">
            {{item.name}} ({{item.imgList.length}})
          </li>
        </ul>
      </div>
    </div>
    <div v-show="indexShow" class="indexPage">
      <div class="indexHeader" @click="closeIndex">
        <span>Close</span>
      </div>
      <div class="indexContent">
        <div class="indexList">
          <div class="imgDiv" v-for="item in imgConfig[groupIndex].imgList">
            <img class="indexImg" :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="indexFooter">
        <span>{{groupName}}</span>
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
        titleE: false,
        titleL1: false,
        titleL2: false,
        rightOpen: false,
        imgConfig: imgConfig,
        groupIndex: 2,
        imgIndex: 0,
        imageIndexB: false,
        whiteOut:false,
        whiteShow:true,
        indexShow:false
      }
    },
    computed: {
      groupName() {
        return this.imgConfig[this.groupIndex].name
      },
      groupTotal() {
        return this.imgConfig[this.groupIndex].imgList.length
      },
      activeSrc() {
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
    methods: {
      titleLeave() {
        let that = this;
        setTimeout(function () {
          that.titleL1 = true;
          setTimeout(function () {
            that.titleL2 = true;
            that.fullLeave();
          }, 200)
        }, 1000)
      },
      fullLeave() {
        let that = this;
        setTimeout(function () {
          that.fullL = true;
          that.whiteGoOut()
        }, 500)
      },
      whiteGoOut(){
        let that = this;
        setTimeout(function () {
          that.whiteOut = true;
          that.imageIndexBottom()
        }, 500)
      },
      imageIndexBottom() {
        let that = this;
        setTimeout(function () {
          // that.whiteShow=false;
          that.whiteOut = true;
          that.imageIndexB = true;
        }, 500)
      },
      goOther(e) {
        let width = window.screen.width;
        if (e.offsetX > width / 2) {
          this.goNext();
        } else {
          this.goBefore();
        }
      },
      goNext() {
        let that=this;
        if (this.imgIndex < this.imgConfig[this.groupIndex].imgList.length - 1) {
          this.imgIndex++
        }else{
          that.whiteShow=true;
          that.whiteOut = false;
          that.imageIndexB=false;
          setTimeout(function () {
            if(that.groupIndex<that.imgConfig.length-1){
              that.groupIndex++;
              that.imgIndex=0;
            }else{
              that.groupIndex=0;
              that.imgIndex=0;
            }
          },1000);
          setTimeout(function () {
            that.whiteOut = true;
          },1500);
          setTimeout(function () {
            that.imageIndexB = true;
          },2000)
        }
      },
      goBefore() {
        let that=this;
        if (this.imgIndex > 0) {
          this.imgIndex--
        }else{
          that.whiteShow=true;
          that.whiteOut = false;
          that.imageIndexB=false;
          setTimeout(function () {
            if(that.groupIndex>0){
              that.groupIndex--;
              that.imgIndex=that.imgConfig[that.groupIndex].imgList.length-1;
            }else{
              that.groupIndex=that.imgConfig.length-1;
              that.imgIndex=that.imgConfig[that.groupIndex].imgList.length-1;
            }
          },1000);
          setTimeout(function () {
            that.whiteOut = true;
          },1500);
          setTimeout(function () {
            that.imageIndexB = true;
          },2000)
        }
      },
      gotoIndex(item,index) {
        let that=this;
        if(that.groupIndex==index){
          return
        }
        that.rightOpen = false;
        that.whiteShow=true;
        that.whiteOut = false;
        that.imageIndexB=false;
        setTimeout(function () {
          that.groupIndex=index;
          that.imgIndex=0
        },1000);
        setTimeout(function () {
          that.whiteOut = true;
        },1500);
        setTimeout(function () {
          that.imageIndexB = true;
        },2000)
      },
      openRightIndex() {
        this.rightOpen = true;
      },
      closeRightIndex() {
        this.rightOpen = false;
      },
      OpenIndex(){
        this.indexShow=true;
      },
      closeIndex(){
        this.indexShow=false;
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

  .beginTitle1 {
    position: absolute;
    top: 50%;
    left: 25%;
    color: white;
    font-size: 14px;
    opacity: 1;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }

  .beginTitle2 {
    position: absolute;
    top: 50%;
    left: 60%;
    color: white;
    font-size: 14px;
    opacity: 1;
    /*font-weight: bold;*/
    transform: translate(-50%, -50%);
  }

  .titleLeave {
    top: 40%;
    opacity: 0;
    transition: 1s;
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

  .imageIndex {
    font-weight: bold;
    position: absolute;
    bottom: 45%;
    left: 50%;
    width: 100%;
    height: 50px;
    line-height: 50px;
    transform: translate(-50%, -50%);
    font-size: 14px;
    transition: 1s;
    z-index: 2;
  }

  .imageIndexBottom {
    font-size: 13px;
    bottom: -20px;
    transform: translate(-50%, -50%);
    transition: 1s;
  }

  .picTop {
    position: absolute;
    height: 10%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: Center;
  }

  .picTop span {
    font-size: 12px;
    font-weight: bolder;
    font-family: Untitled Sans Medium, Helvetica, Arial, sans-serif;
    font-style: normal;
  }

  .picTop .midLine1 {
    display: inline-block;
    width: 19px;
    height: 1px;
    background-color: #fff;
    margin: 0 5px;
    border-bottom: 1px black solid;
    top: 1px;
  }

  .whitePage {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    z-index:1;
    transition: 1s;
    margin-top: 0;
  }
  .whiteOut{
    height: 0;
    transition: 1s;
  }
  .imageContent {
    position: absolute;
    width: 100%;
    height: 80%;
    top: 10%;
    overflow: hidden;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    transition: 1s;
  }

  .indexOpen {
    transform: translate(-25%, 0%);
    transition: 1s;
  }

  .imageContent img {
    width: calc(100% - 40px);
    height: auto;
    will-change: opacity, transform;
    opacity: 1;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0;
    margin: auto;
    position: absolute;
  }

  .rightIndex {
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

  .rightIndexActive {
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition: 1s;
  }
  .bold{
    font-weight: bold;
  }
  .rightTitle {
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

  .rightTitle .midLine2 {
    display: inline-block;
    width: 10px;
    height: 1px;
    background-color: #fff;
    margin: 0 5px;
    border-top: 1px black solid;
    top: 1px;
  }

  .close {
    float: right;
    margin-top: 5px;
  }

  .close svg {
    width: 18px;
    height: 18px;
  }

  .groupDiv {
    width: 86%;
    left: 7%;
    position: relative;
    overflow: hidden;
    padding-left: 6px;
  }

  .groupDiv li {
    text-align: left;
    font-size: 14px;
    line-height: 2.76923;
    letter-spacing: 0;
  }
  .indexPage{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 7;
    /*display: none;*/
    cursor: auto;
    opacity: 1;
  }
  .indexHeader{
    position: absolute;
    width: 100%;
    height: 80px;
    left: 0;
    top: 0;
    z-index: 3;
    background: #fff;
    /*opacity: 0;*/
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .indexHeader span{
    font-family: Untitled Sans,Helvetica,Arial,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.92308;
    letter-spacing: 0;
    color: #a3a3a3;
    cursor: pointer;
  }
  .indexContent{
    position: relative;
    z-index: 2;
    display: block;
    height: 100%;
    padding: 0 16px;
    padding-top: 80px;
  }
  .indexContent .indexList{
    height: calc(100% - 160px);
    -ms-flex-line-pack: start;
    align-content: flex-start;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 0;
    flex-wrap: wrap;
    justify-content:flex-start;
    padding: 0;
    margin: 0 auto;
    position: relative;
    letter-spacing: -.31em;
    word-spacing: -.43em;
    list-style-type: none;
    background: rgba(255,255,255,.8);
    text-align: left;
  }
  .indexContent .imgDiv{
    position: relative;
    vertical-align: top;
    display: inline-block;
    zoom: 1;
    width: 20%;
    margin-bottom: 17px;
    text-align: center;
  }
  .imgDiv .indexImg{
    position: relative;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: calc(100% - 6px);
    height: auto;
    margin-left: 3px;
    will-change: opacity,transform;
  }
  .indexFooter{
    position: absolute;
    width: 100%;
    height: 80px;
    left: 0;
    bottom: 0;
    z-index: 3;
    background: #fff;
    /* opacity: 0; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .indexFooter span{
    font-family: Untitled Sans,Helvetica,Arial,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.92308;
    letter-spacing: 0;
    color: #a3a3a3;
    cursor: pointer;
  }
</style>
