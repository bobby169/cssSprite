<template>
  <div>
    <css-sprite class="sprite" ref="sprite" :fps="fps" :images="images" :frames="frames" :paused="paused"
                :animations="animations" @change="change"
                @animationend="animationend"></css-sprite>
    <div class="btns">
      <button @click="left">Go Left</button>
      <button @click="right">Go Right</button>
      <button @click="play">Play</button>
      <button @click="stop">Stop</button>
      <button @click="gotoAndPlay">gotoAndPlay</button>
      <button @click="gotoAndStop">gotoAndStop</button>
    </div>
  </div>
</template>

<script>
  import CssSprite from '../index'

  export default {
    name: 'CssSpriteDemo',
    components: {
      CssSprite
    },
    data() {
      return {
        images: require('!url-loader?mimetype=image/png!./zhaoyun.png'), // base64方式
        // images: require('./zhaoyun.png'),
        fps: 12,
        paused: false,
        // 如果frames没有定义宽度，可以在css中定义
        frames: [[82, 0], [164, 255], [82, 340], [0, 85], [82, 425], [164, 85], [82, 255], [0, 425], [164, 0], [0, 0], [0, 170], [0, 255], [164, 170], [0, 340], [82, 85], [82, 170]],
        // 比较复杂的动画示例
        animations: {
          runRight: {
            frames: [0, 8, 9, 10, 11, 12, 13, 14],
            speed: 0.5, // 0.5倍速度，相对于当前fps,
            next: 'runLeft'
          },
          runLeft: {
            frames: [15, 1, 2, 3, 4, 5, 6, 7],
            speed: 2, // 2倍速度，相对于当前fps
            next: 'runRight'
          }
        }
//        animations: {
//          runRight: [0, 1, 2, 3, 4, 5, 6, 7],
//          runLeft: [8, 9, 10, 11, 12, 13, 14]
//        }
      }
    },
    methods: {
      left() {
        this.$refs.sprite.gotoAndPlay('runLeft')
      },
      right() {
        this.$refs.sprite.gotoAndPlay('runRight')
      },
      play() {
        this.$refs.sprite.play()
      },
      stop() {
        this.$refs.sprite.stop()
      },
      gotoAndPlay() {
        this.$refs.sprite.gotoAndPlay(0)
      },
      gotoAndStop() {
        this.$refs.sprite.gotoAndStop('runLeft')
      },
      change(currentFrame) {
        // console.info(currentFrame)
      },
      animationend() {
        console.log('animation End')
      }
    }
  }
</script>

<style lang="less">
  button {
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    border-style: solid;
    border-width: 1px;
    padding: 2px 14px 4px;
    font-size: 24px;
  }

  .sprite {
    width: 80px;
    height: 83px;
    background: url(./zhaoyun.png);
  }
</style>
