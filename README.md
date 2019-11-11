# CssSprite
[![Build Status](https://travis-ci.com/bobby169/cssSprite.svg?branch=master)](https://travis-ci.com/bobby169/cssSprite)

## 介绍
> CssSprite，方便对逐帧动画（连续的sprite图片）在DOM中进行渲染，控制动画播放。

> 有过[createjs](https://createjs.com/)经验的开发者应比较熟悉[createjs.SpriteSheet](https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html)和[createjs.Sprite](https://www.createjs.com/docs/easeljs/classes/Sprite.html)，通过这两个类可以方便在canvas实现逐帧动画，但createjs只能针对canvas操作。如果我们用sprite做为背景图片，通过改变background-position来播放动画怎么可以快速实现？CssSprite正是实现了createjs.Sprite和createjs.SpriteSheet的方法和属性，直接对DOM进行Sprite控制。

> 如果你熟悉createjs.Sprite和createjs.SpriteSheet，可以轻松运用CssSprite，因为两者API极为相似。没有createjs或canvas经验的开发者也可以轻松学习运用CssSprite。

> CssSprite功能强大，（因为实现了createjs.Sprite API）支持三种渲染模式，background-position（sprite图片），background-image（单独图片），img标签（单独图片）。具体用法请参考example中的示例。

## 示例

- [3d-adidas.html](https://bobby169.github.io/cssSprite/example/3d-adidas.html)
- [game.html](https://bobby169.github.io/cssSprite/example/game.html)
- [pig/index.html](https://bobby169.github.io/cssSprite/example/pig/index.html)
- [render-background-position.html](https://bobby169.github.io/cssSprite/example/render-background-position.html)
- [render-background-position2.html](https://bobby169.github.io/cssSprite/example/render-background-position2.html)
- [render-base64.html](https://bobby169.github.io/cssSprite/example/render-base64.html)
- [render-img.html](https://bobby169.github.io/cssSprite/example/render-img.html)

## Build

```bash
npm run build
```

## vue-css-sprite

见[src/vue-css-sprite](https://github.com/bobby169/cssSprite/tree/master/src/vue-css-sprite)

## react-css-sprite

见[src/react-css-sprite](https://github.com/bobby169/cssSprite/tree/master/src/react-css-sprite)

## API参考

##### 构造函数
**CssSprite**(options)

###### Parameters:
###### @options.target:String 元素的id或class

###### @options.images:Array/String，可选

###### @options.frames:Object/Array，可选，自定义每帧的X，Y，宽，高，spacing，margin

###### @options.animations:Object，可选，定义相关动作

###### @options.fps:Int，可选，动画每杪播放帧数，推荐24-60

###### @options.duration:Int，可选，动画一次循环总时间

###### @options.frameIndex:Int，可选，动画初始帧位置

###### @options.paused:Boolean，可选，是否自动播放

###### @options.loop:Number，可选，动画循环次数

###### @options.change:Function，可选，每帧执行的回调函数

###### @options.animationend:Function，可选，动画执行完的回调函数

##### 实例方法
**frame** (currentFrame)
播放头直接停在某帧，不常用。推荐使用gotoAndStop(frameIndexOrAnimation)方法

###### @param currentFrame:Number，实际图片每帧的顺序编号

**gotoAndPlay** (frameIndexOrAnimation) 跳到某帧并播放
        
###### @param frameIndexOrAnimation:Number/String

**gotoAndStop** (frameIndexOrAnimation)跳到某帧停止播放，如果你不想用内部的计时器，如自定义缓动播放某帧，非常有用

###### @param frameIndexOrAnimation:Number/String

**play** (frameIndexOrAnimation) 和gotoAndPlay一样，这个更多的是不传参数，恢复播放功能

###### @param frameIndexOrAnimation:Number/String

**stop** () 停止播放

**fps** (fps) 动态更新帧频,如fps = 10，则每秒播放10帧

###### @param fps:Number

##### 静态方法

**createAnimations** (begin,end) 快速生成开始与结束的连续动画数组的一个帮助方法

###### @param begin:Int

###### @param end:Int

###### @returns {Array}

##### 实例属性

**target** 指向目标DOM元素

**frameIndex** 可以获取和设置当前的frameIndex索引

**currentAnimation** 获取当前动画

**currentAnimationName** 获取当前动画名

## 示例说明

##### frames参数
```javascript
//frames定义为object对象,没有createjs.SpriteSheet的regX和regY
frames: {width:64, height:64, count:20, spacing:0, margin:0}

//frames定义为数组，二维数组参数分别对应x,y,width,height
//createjs.SpriteSheet的imageIndex, regX, regY定义会被忽略
frames: [[82,0,80,83],[164,255,79,83],[82,340,80,83]

//frames定义为数组，二维数组参数分别对应x,y
frames: [[82,0],[164,255],[82,340],[0,85],[82,425]
```

##### animations参数
```javascript
//动画名后面直接是数组
//注意不支持createjs.SpriteSheep用数组来定义start, end, next, speed。
//每一帧要单独定义，如果是连续的自然数索引，推荐用CssSprite.createAnimations(0,length-1）方法
animations: {
    runRight: [0,8,9,10,11,12,13,14],
    runLeft: [15,1,2,3,4,5,6,7]
}

//动画名后面直接是object对象，用法基本和createjs.SpriteSheet一致
//speed是当前fps的倍数，next是下个animations动画名
animations: {
    runRight: {
        frames:[0,8,9,10,11,12,13,14],
        speed:0.5,//0.5倍速度，相对于当前fps
        next:'runLeft'
    },
    runLeft: {
        frames:[15,1,2,3,4,5,6,7],
        speed:2,//2倍速度，相对于当前fps
        next:'runRight'
    }
}

//下面是循环执行名为full的animations
animations:{
    full:{
        frames:CssSprite.createAnimations(0,73),
        next:'full'
    }
}
```

##### frameIndex实例属性
```javascript
var sprite = new CssSprite({target:'.sprite'});

function move() {
    //直接赋值，不要担心frameIndex超过totalIndex，如果大于totalIndex会把frameIndex更新为0
    sprite.frameIndex++;
    
    //注意不要直接用sprite.gotoAndStop(sprite.frameIndex++)，如果对frameIndex赋值后，请重新获取一次sprite.frameIndex
    sprite.gotoAndStop(sprite.frameIndex);
}
```

##### gotoAndStop实例方法

> 如果你的动画是先快后慢这样的缓动需求，可以直接跳过系统内部的定时器。根据自己需求灵活运用gotoAndStop可以动态播放每帧。如可以用[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch)结合来播放动画

```javascript
var sprite = new CssSprite({target:'.sprite'});

var num = {frameIndex:0};
new AlloyTouch({
    touch:'body',//反馈触摸的dom
    target: num, //运动的对象
    property: "frameIndex",  //被运动的属性
    min: 0, //不必需,运动属性的最小值,越界会回弹
    max: 200, //不必需,滚动属性的最大值,越界会回弹
    change:function(value){
        sprite.gotoAndStop(value);
    }
}
```
## 渲染模式

##### backgroundPosition渲染

> 你可以先定义sprite元素的背景图片，frame的width，height。CssSprite默认就可以自动计算各个frame的backgroundPosition位置了。如果你的sprite图片不是各个frame都铺满的话，请写上frames.count属性

##### img标签渲染
> 如果你用到createjs的preload.js来加载连续图片组合成序列帧动画，因为加载成功后已经生成成了img元素，CssSprite直接用img标签来渲染。如果图片非常多，用backgroundPosition需要非常大的图片，性能会有非常大的影响。这时可以用img方式做成单张图，可以高效渲染。

##### backgroundImage渲染
> 如果序列帧不想做成sprite图片，可以把单个图片直接转成base64，base64加载完后，CssSprite自动判断用backgroundImage直接渲染相应序列帧的base64图片。

## 视频文件如何导出为序列图片？
- 导入视频文件到PhotoShop：
1. 打开PhotoShop软件
2. 文件-> 新建
3. 填写“宽度”和“高度”为视频的宽高像素
4. 文件-> 导入 -> 视频帧到图片

- 导出序列图片
1. 文件-> 导出-> 将图层导出到文件
2. 选择目标位置，不要勾选裁切图层

- 图片批量命名

```bash
# 先按你的路片路径和文件名规则修改 /bin/rename.js
node ./bin/rename.js
```
如上步骤就完成了视频文件导出为序列图片，此时图片较多，后面的动画一般用到**img标签渲染**。注意，一定要用loader预加载所有图片再渲染动画。用法参考[render-img.html](https://bobby169.github.io/cssSprite/example/render-img.html)

## 用nodejs自动生成Sprite Sheet图片和模板文件

```bash
node ./bin/makeSprite.js -s [yourImageDir]
```

## Adobe An如何导出为Sprite Sheet图片？

1. 新建Movie Clip元件
2. 完成Movie Clip动画制作
3. 打开Libray，选中当前的Movie Clip元件
4. 右健-> Generate Sprite Sheet
5. Data format选用easeljs
6. 点Export按钮
7. 得到图片和js数据文件

而后就是用CssSprite完成动画。此时我们一般用**backgroundPosition渲染**，把上面得到的js数据文件中的frames数组copy到frames中。用法参考[pig/index.html](https://bobby169.github.io/cssSprite/example/pig/index.html)

## License

所有代码采用 [MIT License](http://opensource.org/licenses/MIT) 开源。
