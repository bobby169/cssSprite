import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sprite from '../js/cssSprite'

export default class CssSprite extends Component {
  static defaultProps = {
    fps: 40,
    paused: false,
    frameIndex: 0,
    loop: -1
  }

  static propTypes = {
    images: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    frames: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    fps: PropTypes.number,
    duration: PropTypes.number,
    paused: PropTypes.bool,
    animations: PropTypes.object,
    frameIndex: PropTypes.number,
    loop: PropTypes.number,
    change: PropTypes.func,
    animationend: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = { date: new Date() }
    this.target = React.createRef()
    this.cssSprite = null
  }

  gotoAndPlay (frameIndexOrAnimation) {
    this.cssSprite.gotoAndPlay(frameIndexOrAnimation)
  }

  gotoAndStop (frameIndexOrAnimation) {
    this.cssSprite.gotoAndStop(frameIndexOrAnimation)
  }

  play (frameIndexOrAnimation) {
    this.cssSprite.play(frameIndexOrAnimation)
  }

  stop () {
    this.cssSprite.stop()
  }

  getFrameIndex () {
    return this.cssSprite.frameIndex
  }

  getCurrentAnimation () {
    return this.cssSprite.currentAnimation
  }

  getCurrentAnimationName () {
    return this.cssSprite.currentAnimationName
  }

  componentDidMount () {
    const {
      images,
      frames,
      fps,
      duration,
      paused,
      animations,
      frameIndex,
      loop,
      change,
      animationend
    } = this.props

    let options = {
      target: this.target.current,
      images: images,
      frames: frames,
      fps: fps,
      duration: duration,
      paused: paused,
      animations: animations,
      frameIndex: frameIndex,
      loop: loop,
      change: change,
      animationend: animationend
    }
    this.cssSprite = new Sprite(options)
  }

  componentWillUnmount () {
    this.cssSprite.stop()
  }

  render () {
    const {
      images,
      frames,
      fps,
      duration,
      paused,
      animations,
      frameIndex,
      loop,
      change,
      animationend,
      className,
      ...others
    } = this.props
    return (
      <div
        ref={this.target}
        {...others}
        style={{ ...others.style }}
        className={className}
      />
    )
  }
}
