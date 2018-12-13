/*!
 * DATE: 2018-01-25
 * @author: bobby169
 * 115393304
 * (c) bobby169
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.CssSprite = factory());
}(this, (function () {
    'use strict';

    /**
     * CssSprite，方便对逐帧动画（连续的sprite图片）在DOM中进行渲染，控制动画播放。
     * 实现了createjs.Sprite与createjs.SpriteSheet的API，createjs粉
     *
     * @options.target:String 元素的id或class
     * @options.images:Array/String，可选
     * @options.frames:Object/Array，可选，自定义每帧的X，Y，宽，高，spacing，margin
     * @options.animations:Object，可选，定义相关动作
     * @options.fps:Int，可选，动画每杪播放帧数，推荐24-60
     * @options.duration:Int，可选，动画一次循环总时间
     * @options.frameIndex:Int，可选，动画初始帧位置
     * @options.paused:Boolean，可选，是否自动播放
     * @options.loop:Number，可选，动画循环次数
     * @options.change:Function，可选，每帧执行的回调函数
     * @options.animationend:Function，可选，动画执行完的回调函数
     * @constructor
     */
    function CssSprite(options) {
        var _this = this;
        this.options = Object.assign({
            target: 'body',
            images: null,
            frames: {},
            animations: null,
            fps: 30,
            paused: false,
            frameIndex: 0,
            loop: -1,
            change: false,
            animationend: false
        }, options);

        var isElement = function (obj) {
            return !!(obj && obj.nodeType === 1);
        }

        var isObject = function (source) {
            return 'function' == typeof source || !!(source && 'object' == typeof source);
        };

        this.target = isElement(this.options.target) ? this.options.target : document.querySelector(this.options.target);
        this.renderType = 'backgroundPosition';
        this._frameIndex = this.options.frameIndex;
        this._frameWidth = 0;
        this._frameHeight = 0;
        this._frames = [];
        this._spacing = 0;
        this._margin = 0;
        this._loopIndex = 0;
        this.currentFrame = 0;
        if (!this.options.frames) {
            this.options.frames = Object.create(null);
        }

        if (this.options.loop === 0) {
            this.options.paused = true;
        }

        if (this.options.frames.width) {
            this.target.style.width = this.options.frames.width + 'px';
        }

        if (this.options.frames.height) {
            this.target.style.height = this.options.frames.height + 'px';
        }

        if (isObject(this.options.frames) && !this.options.frames.width) {
            this.options.frames.width = this.target.clientWidth;
        }
        if (isObject(this.options.frames) && !this.options.frames.height) {
            this.options.frames.height = this.target.clientHeight;
        }

        if (Array.isArray(this.options.images) && this.options.images.length) {
            this.totalFrames = this.options.images.length;
            this.options.images.forEach(function (img, index) {
                if (img.tagName && img.tagName === 'IMG') {
                    if (index !== 0) {
                        img.style.display = 'none';
                    }
                    _this.target.appendChild(img);
                    _this.renderType = 'img';
                } else {
                    _this.renderType = 'backgroundImage';
                }
            });
            if (!_this.options.paused) {
                _this._tick();
            }
        } else if (Array.isArray(this.options.frames) && this.options.frames.length) {
            this.totalFrames = this.options.frames.length;
            for (var i = 0; i < this.totalFrames; i++) {
                var x = this.options.frames[i][0];
                var y = this.options.frames[i][1];
                var frameWidth = this.options.frames[i][2] ? this.options.frames[i][2] : this.target.clientWidth;
                var frameHeight = this.options.frames[i][3] ? this.options.frames[i][3] : this.target.clientHeight;
                this._frames.push({x: x, y: y, width: frameWidth, height: frameHeight});
            }
            if (!_this.options.paused) {
                _this._tick();
            }
        } else if (this.options.frames.width !== null && this.options.frames.height !== null) {
            this._frameWidth = this.options.frames.width;
            this._frameHeight = this.options.frames.height;
            this._spacing = this.options.spacing || 0;
            this._margin = this.options.margin || 0;
            this.totalFrames = this.options.frames.count;

            var frameCount = 0, frameWidth = this._frameWidth, frameHeight = this._frameHeight;
            var spacing = this._spacing, margin = this._margin;
            var totalFrames = this.totalFrames;

            this._loadImage(function (width, height) {
                var imgW = width, imgH = height;
                var y = margin;
                while (y <= imgH - margin - frameHeight) {
                    var x = margin;
                    while (x <= imgW - margin - frameWidth) {
                        if (frameCount >= totalFrames) {
                            break;
                        }
                        frameCount++;
                        _this._frames.push({x: x, y: y, width: frameWidth, height: frameHeight});
                        x += frameWidth + spacing;
                    }
                    y += frameHeight + spacing;
                }

                if (_this.totalFrames === undefined) {
                    _this.totalFrames = frameCount;
                }

                if (!_this.options.paused) {
                    _this._tick();
                }
            })

        } else {
            if (!_this.options.paused) {
                _this._tick();
            }
        }

    }

    Object.assign(CssSprite.prototype, {
        _getCss: function (element, property) {
            var camelize = function (str) {
                return str.replace(/-+(.)?/g, function (match, chr) {
                    return chr ? chr.toUpperCase() : ''
                })
            };
            return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property);
        },
        _loadImage: function (callback) {
            var imageSrc;
            if (typeof this.options.images === 'string') {
                imageSrc = this.options.images;
                this.target.style.backgroundImage = 'url(' + imageSrc + ')';
            } else {
                imageSrc = this._getCss(this.target, 'background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
            }
            var image = new Image();

            image.onload = function () {
                var width = image.width,
                    height = image.height;
                callback(width, height);
            };
            image.src = imageSrc;
        },
        _getFrameIndex: function () {
            return this._frameIndex;
        },
        _setFrameIndex: function (frameIndex) {
            var total = this.options.animations ? this.currentAnimation.length : this.totalFrames;
            frameIndex = frameIndex > total - 1 ? 0 : frameIndex;
            frameIndex = frameIndex < 0 ? total - 1 : frameIndex;
            this._frameIndex = frameIndex;
        },
        _animation: function () {
            var checkLoop = function (frameIndex, finalFrame) {
                frameIndex++;
                if (frameIndex >= finalFrame) {
                    if (this.currentAnimation && this.currentAnimation.next) {
                        frameIndex = 0;
                        this.currentAnimation = this.options.animations[this.currentAnimation.next];
                        this._tick()
                    } else if (this.options.loop === -1) {
                        frameIndex = 0;
                        this._tick();
                    } else if (this.options.loop > 0 && this._loopIndex < this.options.loop - 1) {
                        frameIndex = 0;
                        this._loopIndex++;
                        this._tick();
                    } else {
                        if (typeof this.options.animationend === 'function') {
                            this.options.animationend.call(this);
                        }
                    }
                } else {
                    this._tick();
                }

                return frameIndex;
            };

            if (!this.options.animations) {
                this.frame(this._frameIndex);
                this._frameIndex = checkLoop.call(this, this._frameIndex, this.totalFrames);
            } else {
                if (this.currentAnimation === undefined) {
                    for (var k in this.options.animations) {
                        this.currentAnimation = this.options.animations[k];
                        break;
                    }
                }

                if (Array.isArray(this.currentAnimation)) {
                    this.frame(this.currentAnimation[this._frameIndex]);
                    this._frameIndex = checkLoop.call(this, this._frameIndex, this.currentAnimation.length);
                } else {
                    if (this.currentAnimation.frames && this.currentAnimation.frames.length) {
                        this.frame(this.currentAnimation.frames[this._frameIndex]);
                        this._frameIndex = checkLoop.call(this, this._frameIndex, this.currentAnimation.frames.length);
                    }
                }

            }
        },
        _tick: function () {
            var _this = this;
            var speed = 1000 / this.options.fps;

            if (this.currentAnimation && this.currentAnimation.speed) {
                speed = speed / this.currentAnimation.speed;
            }

            if (this.options.duration !== undefined) {
                speed = this.options.duration / this.totalFrames;
            }

            //清除this._interval，防止重复_tick
            if (this._interval) clearTimeout(this._interval);

            this._interval = setTimeout(function () {
                _this._animation();
            }, speed);
        },
        _goto: function (frameIndexOrAnimation) {
            this.stop();
            this._loopIndex = 0;
            if (typeof frameIndexOrAnimation === 'string') {
                if (this.options.animations[frameIndexOrAnimation] !== this.currentAnimation) {
                    this._frameIndex = 0;
                    this.currentAnimation = this.options.animations[frameIndexOrAnimation];
                    this.currentAnimationName = frameIndexOrAnimation;
                }
                this._tick();
            } else if (typeof frameIndexOrAnimation === 'number') {
                this._frameIndex = frameIndexOrAnimation;
                this._tick();
            } else if (frameIndexOrAnimation === undefined) {
                this._frameIndex = 0;
                this._tick();
            }
        },
        /**
         * 播放头直接停在某帧，不常用。推荐使用gotoAndStop(frameIndexOrAnimation)方法
         * @param currentFrame:Number，实际图片每帧的顺序编号
         */
        frame: function (currentFrame) {
            var $target = this.target;
            if (typeof currentFrame === 'undefined' || isNaN(currentFrame)) {
                currentFrame = this.currentFrame;
            }

            if (this.renderType === 'backgroundImage') {
                $target.style.backgroundImage = this.options.images[currentFrame].img ? 'url(' + this.options.images[currentFrame].img + ')' : 'url(' + this.options.images[currentFrame] + ')';
            } else if (this.renderType === 'img') {
                this.options.images.forEach(function (img, index) {
                    if (index === currentFrame) {
                        img.style.display = 'inline-block';
                    } else {
                        img.style.display = 'none';
                    }
                })
            } else {
                $target.style.backgroundPosition = (-this._frames[currentFrame].x) + 'px ' + (-this._frames[currentFrame].y) + 'px';
                $target.style.width = this._frames[currentFrame].width + 'px';
                $target.style.height = this._frames[currentFrame].height + 'px';
            }

            //和createjs.Sprite的this.currentFrame保持一致
            this.currentFrame = currentFrame;

            if (typeof this.options.change == 'function') {
                this.options.change.apply(this, [currentFrame, this._frameIndex]);
            }
        },
        /**
         * 跳到某帧并播放
         * @param frameOrAnimation:Number/String
         */
        gotoAndPlay: function (frameIndexOrAnimation) {
            this._goto(frameIndexOrAnimation);
        },
        /**
         * 跳到某帧停止播放
         * 如果你不想内部的计时器，如自定义缓动播放某帧，非常有用
         * @param frameIndexOrAnimation:Number/String
         */
        gotoAndStop: function (frameIndexOrAnimation) {
            this.stop();
            if (typeof frameIndexOrAnimation === 'undefined') {
                frameIndexOrAnimation = this._frameIndex;
            }

            if (typeof frameIndexOrAnimation === 'string') {
                this._frameIndex = 0;
                this.currentAnimation = this.options.animations[frameIndexOrAnimation];
                this.currentAnimationName = frameIndexOrAnimation;
                this.frame(this.currentAnimation[this._frameIndex]);
            } else if (this.options.animations) {
                this.frame(this.currentAnimation[frameIndexOrAnimation]);
            } else {
                this._frameIndex = frameIndexOrAnimation;
                this.frame(this._frameIndex);
            }
        },
        /**
         * 和gotoAndPlay一样，这个更多的是不传参数，恢复播放功能
         * @param frameOrAnimation
         */
        play: function (frameIndexOrAnimation) {
            this._goto(frameIndexOrAnimation);
        },
        /**
         * 停止播放
         */
        stop: function () {
            clearTimeout(this._interval);
        },
        /**
         * 动态更新帧频,如fps = 10，则每秒播放10帧
         * @param fps:Number
         */
        fps: function (fps) {
            this.options.fps = fps;
        }
    })

    /**
     * 可以直接读写frameIndex属性，比如
     * var sprite = new CssSprite();
     * sprite.frameIndex++ //重置frameIndex
     * sprite.gotoAndPlay(sprite.frameIndex)
     */
    try {
        Object.defineProperties(CssSprite.prototype, {
            frameIndex: {set: CssSprite.prototype._setFrameIndex, get: CssSprite.prototype._getFrameIndex}
        });
    } catch (e) {
    }

    /**
     * 快速生成开始与结束的连续动画数组
     * @param begin:Int
     * @param end:Int
     * @returns {Array}
     */
    CssSprite.createAnimations = function (begin, end) {
        var arr = [];
        while (end - begin >= 0) {
            arr.push(begin);
            begin++;
        }
        return arr;
    }

    return CssSprite;

})));

