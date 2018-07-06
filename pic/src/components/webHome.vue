<template>
  <div @click="waitTime=0">
    <div class="fullpage1" :class="{leave:fullL}">
      <p class="beginTitle1" :class="{titleLeave:titleL1,titleShow:titleE1}">Jack Davison</p>
      <p class="beginTitle2" :class="{titleLeave:titleL2,titleShow:titleE2}">Photo Grapher</p>
    </div>
    <div class="fullpage2" :class="{indexOpen:rightOpen}">
      <div @click="goOther" class="picTop">

      </div>

      <div class="imageContent" @click="goOther">
        <div v-show="whiteShow" class="whitePage" :class="{whiteOut:whiteOut}"></div>
        <img :src="activeSrc" alt="">
      </div>
      <p class="imageIndex imageIndexBottom" >
        <span @click="openRightIndex">Index</span>
        <span class="midLine1"></span>
        <span @click="OpenIndex">Thumbs</span>
      </p>
    </div>
    <div class="rightIndexBg" :class="{rightIndexBgActive:rightOpen}" @click="closeRightIndex"></div>
    <div class="rightIndex " @mouseenter="rightIndexHover=false" @mouseout="rightIndexHover=true" :class="{rightIndexActive:rightOpen,rightIndexHover:rightIndexHover}">
      <div class="rightBottom">
        <span>Email</span>
        <span class="midLine2"></span>
        <span>Instagram</span>
        <span class="midLine2"></span>
        <span style="font-weight: bold">Mini Title</span>
        <!--<span class="close">-->
          <!--<svg @click="closeRightIndex" viewBox="0 0 45 45"><title>Close 1.1</title><path-->
            <!--d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path><path-->
            <!--d="M22.5 21.5L44 0l1 1-21.5 21.5L45 44l-1 1-21.5-21.5L1 45l-1-1 21.5-21.5L0 1l1-1z"></path></svg>-->
        <!--</span>-->
      </div>
      <div class="groupDiv">
        <ul>
          <li v-for="item,index in imgConfig" @click="gotoIndex(item,index)" :class="{bold:index==groupIndex}">
            {{item.name}} ({{item.imgList.length}})
          </li>
        </ul>
      </div>
    </div>
    <div class="indexPage" :class="{indexActive:indexShow}">
      <div class="indexHeader" @click="closeIndex">

      </div>
      <div class="indexContent">
        <div class="indexList">
          <div @click="changeIndex(index)" class="imgDiv" v-for="item,index in imgConfig[groupIndex].imgList">
            <img class="indexImg" :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="indexFooter">
        <span>{{groupName}}</span>
        <span class="midLine1"></span>
        <span class="closeSpan" @click="closeIndex">Close</span>
      </div>
    </div>
    <div @click="waitLeave" class="waitPage" :class="{waitActive:waitActive}">
      <div class="waitFooter">{{hour}} : {{minute}} : {{ss}} : {{ms}}</div>
      <img class="randomImg" :class="{randomImgActive:randomImgActive}" :src="randomImg" alt="">
    </div>
  </div>
</template>

<script>
  import imgConfig from '../images/config'

  export default {
    name: "web-home",
    data() {
      return {
        fullL: false,
        titleE1: false,
        titleE2: false,
        titleL1: false,
        titleL2: false,
        rightOpen: false,
        imgConfig: imgConfig,
        groupIndex: 2,
        imgIndex: 0,
        imageIndexB: false,
        whiteOut: false,
        whiteShow: true,
        indexShow: false,
        waitActive: false,
        hour: '00',
        minute: '00',
        ss: '00',
        ms: '00',
        waitTime: 0,
        run:'',
        changeImg:'',
        randomImg:'',
        randomImgActive:false,
        rightIndexHover:true
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
        that.titleE1 = true;
        that.titleLeave();
      }, 1000);
      setTimeout(function () {
        that.titleE2 = true;
      },1500)
      setInterval(that.checkWait, 1000);
    },
    methods: {
      checkWait() {
        let that = this;
        console.log(that.waitTime)
        if (!that.waitActive && that.waitTime < 20) {
          that.waitTime++
        } else if (!that.waitActive && that.waitTime >= 20) {
          that.waitActive = true;
          setTimeout(function () {
            that.runTime()
          }, 1000)
        }
      },
      waitLeave() {
        let that = this;
        that.waitActive = false;
        that.hour = '00';
        that.minute = '00';
        that.ss = '00';
        that.ms = '00';
        clearInterval(that.run);
        clearInterval(that.changeImg);
      },
      runTime() {
        let that = this;
        that.run = setInterval(function () {
          if (parseInt(that.ms) < 1000) {
            that.ms = (parseInt(that.ms) + 10 + parseInt(Math.random() * 2)).toString()
          } else {
            that.ms = '00'
            if (parseInt(that.ss) < 60 && parseInt(that.ss) > 8) {
              that.ss = (parseInt(that.ss) + 1).toString()
            } else if (parseInt(that.ss) < 60 && parseInt(that.ss) <= 8) {
              that.ss = '0' + (parseInt(that.ss) + 1).toString()
            } else {
              that.ss = '00'
              if (parseInt(that.minute) < 60 && parseInt(that.minute) > 8) {
                that.minute = (parseInt(that.minute) + 1).toString()
              } else if (parseInt(that.minute) < 60 && parseInt(that.minute) <= 8) {
                that.minute = '0' + (parseInt(that.minute) + 1).toString()
              } else {
                that.minute = '00'
                if (parseInt(that.hour) < 60 && parseInt(that.hour) > 8) {
                  that.hour = (parseInt(that.hour) + 1).toString()
                } else if (parseInt(that.hour) < 60 && parseInt(that.hour) <= 8) {
                  that.hour = '0' + (parseInt(that.hour) + 1).toString()
                }
              }
            }
          }
        }, 10)
        that.changeImg=setInterval(function () {
          var index=parseInt(Math.random()*that.imgConfig[that.groupIndex].imgList.length)
          that.randomImg=that.imgConfig[that.groupIndex].imgList[index];
          that.randomImgActive=true;
          setTimeout(function () {
            that.randomImgActive=false;
          },1000);
          setTimeout(function () {
            document.querySelector('.randomImg').style.top=Math.random()*50+'%';
            document.querySelector('.randomImg').style.left=Math.random()*50+'%';
          },2000)
        },5000)
      },
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
      whiteGoOut() {
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
        let that = this;
        if (this.imgIndex < this.imgConfig[this.groupIndex].imgList.length - 1) {
          this.imgIndex++
        } else {
          that.whiteShow = true;
          that.whiteOut = false;
          that.imageIndexB = false;
          setTimeout(function () {
            if (that.groupIndex < that.imgConfig.length - 1) {
              that.groupIndex++;
              that.imgIndex = 0;
            } else {
              that.groupIndex = 0;
              that.imgIndex = 0;
            }
          }, 1000);
          setTimeout(function () {
            that.whiteOut = true;
          }, 1500);
          setTimeout(function () {
            that.imageIndexB = true;
          }, 2000)
        }
      },
      goBefore() {
        let that = this;
        if (this.imgIndex > 0) {
          this.imgIndex--
        } else {
          that.whiteShow = true;
          that.whiteOut = false;
          that.imageIndexB = false;
          setTimeout(function () {
            if (that.groupIndex > 0) {
              that.groupIndex--;
              that.imgIndex = that.imgConfig[that.groupIndex].imgList.length - 1;
            } else {
              that.groupIndex = that.imgConfig.length - 1;
              that.imgIndex = that.imgConfig[that.groupIndex].imgList.length - 1;
            }
          }, 1000);
          setTimeout(function () {
            that.whiteOut = true;
          }, 1500);
          setTimeout(function () {
            that.imageIndexB = true;
          }, 2000)
        }
      },
      gotoIndex(item, index) {
        let that = this;
        if (that.groupIndex == index) {
          return
        }
        that.rightOpen = false;
        that.whiteShow = true;
        that.whiteOut = false;
        that.imageIndexB = false;
        setTimeout(function () {
          that.groupIndex = index;
          that.imgIndex = 0
        }, 1000);
        setTimeout(function () {
          that.whiteOut = true;
        }, 1500);
        setTimeout(function () {
          that.imageIndexB = true;
        }, 2000)
      },
      openRightIndex() {
        this.rightOpen = true;
        return false
      },
      closeRightIndex() {
        this.rightOpen = false;
      },
      changeIndex(index) {
        this.indexShow = false;
        this.imgIndex = index;
      },
      OpenIndex() {
        this.indexShow = true;
        return false
      },
      closeIndex() {
        this.indexShow = false;
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
    left: 10%;
    color: white;
    font-size: 14px;
    opacity: 0;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }

  .beginTitle2 {
    position: absolute;
    top: 50%;
    left: 25%;
    color: white;
    font-size: 14px;
    opacity: 0;
    /*font-weight: bold;*/
    transform: translate(-50%, -50%);
  }
  .titleShow{
    opacity: 1;
    transition: 0.5s;
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
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: Center;
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

  .imageIndex span {
    font-size: 12px;
    font-weight: bolder;
    font-family: Untitled Sans Medium, Helvetica, Arial, sans-serif;
    font-style: normal;
    cursor: pointer;
  }

  .imageIndex .midLine1 {
    display: inline-block;
    width: 19px;
    height: 1px;
    margin: 0 5px;
    border-bottom: 1px black solid;
    top: 1px;
  }

  .whitePage {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1;
    transition: 1s;
    margin-top: 0;
  }

  .whiteOut {
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
    max-width: 600px;
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
  .rightIndexBg{
    background: black;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 1s;
    z-index: -1;
  }
  .rightIndexBgActive{
    cursor: pointer;
    z-index: 3;
    opacity:0.85;
    transition: 1s;
  }
  .rightIndex {
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100%;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    width: 50%;
    z-index: 6;
    top: 0;
    left: 50%;
    background: white;
    cursor: auto;
    transform: translate(100%, 0%);
    transition: 1s;
  }

  .rightIndexActive {
    transform: translate(0, 0);
    transition: 1s;
  }
  .rightIndexHover{
    transition: 1s;
    transform: translate(10%, 0) matrix(1, 0, 0, 1, 0, 0);;
  }

  .bold {
    font-weight: bold;
  }

  .rightBottom {
    z-index: 0;
    opacity: 1;
    padding: 0;
    bottom: 0;
    height: 80px;
    line-height: 80px;
    width: 100%;
    position: absolute;
    font-size: 12px;
    text-align: center;
  }

  .rightBottom .midLine2 {
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
    width: 50%;
    left: 45%;
    position: relative;
    overflow: hidden;
    padding-left: 6px;
  }

  .groupDiv li {
    text-align: left;
    font-size: 12px;
    line-height: 2.08333;
    letter-spacing: 0;
  }

  .indexPage {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 100%;
    z-index: 7;
    cursor: auto;
    opacity: 0;
    transition: 1s;
  }

  .indexActive {
    top: 0;
    opacity: 1;
    transition: 1s;
  }

  .indexHeader {
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

  .indexHeader span {
    font-family: Untitled Sans, Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.92308;
    letter-spacing: 0;
    color: #a3a3a3;
    cursor: pointer;
  }

  .indexContent {
    position: relative;
    z-index: 2;
    display: block;
    height: 100%;
    padding: 0 6%;
    padding-top: 80px;
  }

  .indexContent .indexList {
    height: calc(100% - 160px);
    -ms-flex-line-pack: start;
    align-content: flex-start;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0;
    margin: 0 auto;
    position: relative;
    letter-spacing: -.31em;
    word-spacing: -.43em;
    list-style-type: none;
    background: rgba(255, 255, 255, .8);
    text-align: left;
  }

  .indexContent .imgDiv {
    position: relative;
    vertical-align: top;
    display: inline-block;
    zoom: 1;
    width: 10%;
    margin-bottom: 17px;
    text-align: center;
  }

  .imgDiv .indexImg {
    position: relative;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: calc(100% - 6px);
    height: auto;
    margin-left: 3px;
    will-change: opacity, transform;
    cursor: pointer;
  }

  .indexFooter {
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

  .indexFooter span {
    font-family: Untitled Sans, Helvetica, Arial, sans-serif;
    font-style: normal;
    font-size: 13px;
    line-height: 1.92308;
    letter-spacing: 0;
    color: black;
    cursor: pointer;
  }
  .indexFooter .midLine1{
    display: inline-block;
    width: 19px;
    height: 1px;
    margin: 0 5px;
    border-bottom: 1px black solid;
    top: 1px;
  }
  .indexFooter .closeSpan{
    color: #a3a3a3;
    cursor: pointer;
  }

  .waitPage {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: #191919;
    opacity: 0;
    transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);
    transition: 1s;
  }

  .waitActive {
    opacity: 1;
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition: 1s;
  }

  .waitPage .waitFooter {
    position: absolute;
    width: 100%;
    height: 80px;
    line-height: 80px;
    left: 0;
    bottom: 0;
    color: #fff;
    text-align: center;
  }
  .randomImg{
    position: absolute;
    width: 100%;
    max-width: 500px;
    height: auto;
    opacity: 0;
    transition: 1s;
  }
  .randomImgActive{
    opacity: 1;
    transition: 1s;
  }
</style>
