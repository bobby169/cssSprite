<template>
  <div></div>
</template>

<script>
  import CssSprite from './cssSprite'

  export default {
    name: 'CssSprite',
    componentName: 'CssSprite',
    props: {
      images: [String, Array],
      // 可选，自定义每帧的X，Y，宽，高，spacing，margin
      // frames定义为object对象,没有createjs.SpriteSheet的regX和regY
      // frames: {width:64, height:64, count:20, spacing:0, margin:0}

      // frames定义为数组，二维数组参数分别对应x,y,width,height
      // createjs.SpriteSheet的imageIndex, regX, regY定义会被忽略
      // frames: [[82,0,80,83],[164,255,79,83],[82,340,80,83]

      // frames定义为数组，二维数组参数分别对应x,y
      // frames: [[82,0],[164,255],[82,340],[0,85],[82,425]
      frames: {
        type: [Object, Array]
      },
      // 可选，动画每杪播放帧数，推荐24-60
      fps: {
        type: Number,
        default: 30
      },
      // 可选，动画一次循环总时间
      duration: Number,
      paused: {
        type: Boolean,
        default: false
      },
      // 可选，定义相关动作 animations参数文档 http://gitlab.puhuitech.cn/hebo/cssSprite#animations%E5%8F%82%E6%95%B0
      animations: {
        type: Object,
        default: null
      },
      // 可选，动画初始帧位置
      frameIndex: {
        type: Number,
        default: 0
      },
      // 动画循环次数，-1 为无限循环
      loop: {
        type: Number,
        default: -1
      },
      // 可选，每帧执行的回调函数
      change: Function,
      // 可选，动画执行完的回调函数
      animationend: Function
    },
    data() {
      return {
        cssSprite: null
      }
    },
    methods: {
      gotoAndPlay(frameIndexOrAnimation) {
        this.cssSprite.gotoAndPlay(frameIndexOrAnimation)
      },
      gotoAndStop(frameIndexOrAnimation) {
        this.cssSprite.gotoAndStop(frameIndexOrAnimation)
      },
      play(frameIndexOrAnimation) {
        this.cssSprite.play(frameIndexOrAnimation)
      },
      stop() {
        this.cssSprite.stop()
      },
      onChange(frameIndex) {
        this.$emit('change', frameIndex)
      },
      onAnimationend() {
        this.$emit('animationend')
      },
      getFrameIndex() {
        return this.cssSprite.frameIndex
      },
      getCurrentAnimation() {
        return this.cssSprite.currentAnimation
      },
      getCurrentAnimationName() {
        return this.cssSprite.currentAnimationName
      }
    },
    watch: {
      'fps'(val) {
        this.cssSprite.fps(val)
      },
      'frameIndex'(val) {
        this.cssSprite.frameIndex = val
      },
      'paused'(val) {
        this.cssSprite.paused = val
      }
    },
    mounted() {
      let options = {
        target: this.$el,
        images: this.images,
        frames: this.frames,
        fps: this.fps,
        duration: this.duration,
        paused: this.paused,
        animations: this.animations,
        frameIndex: this.frameIndex,
        loop: this.loop,
        change: this.onChange,
        animationend: this.onAnimationend
      }
      this.cssSprite = new CssSprite(options)
    }
  }
</script>

