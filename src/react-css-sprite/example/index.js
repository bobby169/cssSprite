import React from 'react'
import ReactDOM from 'react-dom'
import CssSprite from '../index'
import zhaoyun from './zhaoyun.png'

let props = {
  paused: false,
  loop: 1,
  // 如果frames没有定义宽度，可以在css中定义
  frames: [
    [82, 0],
    [164, 255],
    [82, 340],
    [0, 85],
    [82, 425],
    [164, 85],
    [82, 255],
    [0, 425],
    [164, 0],
    [0, 0],
    [0, 170],
    [0, 255],
    [164, 170],
    [0, 340],
    [82, 85],
    [82, 170]
  ],
  // 比较复杂的动画示例
  animations: {
    runRight: {
      frames: [0, 8, 9, 10, 11, 12, 13, 14],
      speed: 0.5 // 0.5倍速度，相对于当前fps,
      // next: 'runLeft'
    },
    runLeft: {
      frames: [15, 1, 2, 3, 4, 5, 6, 7],
      speed: 2 // 2倍速度，相对于当前fps
      // next: "runRight"
    }
  }
}

class Test extends React.Component {
  constructor (props) {
    super(props)
    this.sprite = React.createRef()
    this.left = this.left.bind(this)
    this.right = this.right.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.gotoAndPlay = this.gotoAndPlay.bind(this)
    this.gotoAndStop = this.gotoAndStop.bind(this)
  }
  left () {
    this.sprite.current.gotoAndPlay('runLeft')
  }
  right () {
    this.sprite.current.gotoAndPlay('runRight')
  }
  play () {
    this.sprite.current.play()
  }
  stop () {
    this.sprite.current.stop()
  }
  gotoAndPlay () {
    this.sprite.current.gotoAndPlay(0)
  }
  gotoAndStop () {
    this.sprite.current.gotoAndStop('runLeft')
  }
  change (currentFrame) {
    // console.info(currentFrame)
  }
  animationend () {
    console.log('animation End')
  }
  render () {
    return (
      <div>
        <CssSprite
          images={zhaoyun}
          {...props}
          style={{ width: '83px', height: '83px' }}
          className="test"
          change={this.change}
          animationend={this.animationend}
          ref={this.sprite}
        />
        <button onClick={this.left}>Go Left</button>
        <button onClick={this.right}>Go Right</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.gotoAndPlay}>gotoAndPlay</button>
        <button onClick={this.gotoAndStop}>gotoAndStop</button>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('root'))
