## 介绍
> CssSprite，方便对逐桢动画（连续的sprite图片）在DOM中进行渲染，控制动画播放。

> 有过[createjs](https://createjs.com/)经验的开发者应比较熟悉[createjs.SpriteSheet](https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html)和[createjs.Sprite](https://www.createjs.com/docs/easeljs/classes/Sprite.html)，通过这两个类可以方便在canvas实现逐桢动画，但createjs只能针对canvas操作。如果我们用sprite做为背景图片，通过改变background-position来播放动画怎么可以快速实现？CssSprite正是实现了createjs.Sprite和createjs.SpriteSheet的方法和属性，直接对DOM进行Sprite控制。

> 如果你熟悉createjs.Sprite和createjs.SpriteSheet，可以轻松运用CssSprite，因为两者API极为相似。没有createjs或canvas经验的开发者也可以轻松学习运用CssSprite。

> CssSprite功能强大，（因为实现了createjs.Sprite API，偷笑）支持三种渲染模式，background-position（sprite图片），background-image（单独图片），img标签（单独图片）。并支持AdobeAn影片剪辑导出Sprite Sheet，在导出时请将Data format设置为easeljs，把导出的js文件中的frames设为CssSprite参数的frames即可。具体用法请参考example中的示例。


## API参考

##### 构造函数
**CssSprite**(options)

###### Parameters:
###### @options.target:String 元素的id或class

###### @options.images:Array/String，可选

###### @options.frames:Object/Array，可选，自定义每桢的X，Y，宽，高，spacing，margin

###### @options.animations:Object，可选，定义相关动作

###### @options.fps:Int，可选，动画每杪播放桢数，推荐24-60

###### @options.duration:Int，可选，动画一次循环总时间

###### @options.paused:Boolean，可选，是否自动播放

###### @options.change:Function，可选，每桢执行的回调函数

###### @options.animationend:Function，可选，动画执行完的回调函数

##### 实例方法
**frame** (currentFrame)
播放头直接停在某桢，不常用。推荐使用gotoAndStop(frameIndexOrAnimation)方法

###### @param currentFrame:Number，实际图片每桢的顺序编号

**gotoAndPlay** (frameIndexOrAnimation) 跳到某桢并播放
        
###### @param frameIndexOrAnimation:Number/String

**gotoAndStop** (frameIndexOrAnimation)跳到某桢停止播放，如果你不想用内部的计时器，如自定义缓动播放某桢，非常有用

###### @param frameIndexOrAnimation:Number/String

**play** (frameIndexOrAnimation) 和gotoAndPlay一样，这个更多的是不传参数，恢复播放功能

###### @param frameIndexOrAnimation:Number/String

**stop** () 停止播放

**fps** (fps) 动态更新桢频,如fps = 10，则每秒播放10桢

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
```js
//frames定义为object对象,没有createjs.SpriteSheet的regX和regY
frames: {width:64, height:64, count:20, spacing:0, margin:0}

//frames定义为数组，二维数组参数分别对应x,y,width,height
//createjs.SpriteSheet的imageIndex, regX, regY定义会被忽略
frames: [[82,0,80,83],[164,255,79,83],[82,340,80,83]

//frames定义为数组，二维数组参数分别对应x,y
frames: [[82,0],[164,255],[82,340],[0,85],[82,425]
```

##### animations参数
```js
//动画名后面直接是数组
//注意不支持createjs.SpriteSheep用数组来定义start, end, next, speed。
//每一桢要单独定义，如果是连续的自然数索引，推荐用CssSprite.createAnimations(0,length-1）方法
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
```js
var sprite = new CssSprite({target:'.sprite'});

function move() {
    //直接赋值，不要担心frameIndex超过totalIndex，如果大于totalIndex会把frameIndex更新为0
    sprite.frameIndex++;
    
    //注意不要直接用sprite.gotoAndStop(sprite.frameIndex++)，如果对frameIndex赋值后，请重新获取一次sprite.frameIndex
    sprite.gotoAndStop(sprite.frameIndex);
}
```

##### gotoAndStop实例方法

> 如果你的动画是先快后慢这样的缓动需求，可以直接跳过系统内部的定时器。根据自己需求灵活运用gotoAndStop可以动态播放每桢。如可以用[AlloyTouch](https://github.com/AlloyTeam/AlloyTouch)结合来播放动画

```js
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

##### backgroundPosition渲染（推荐）

> 你可以先定义sprite元素的背景图片，frame的width，height。CssSprite默认就可以自动计算各个frame的backgroundPosition位置了。如果你的sprite图片不是各个frame都铺满的话，请写上frames.count属性

##### img标签渲染
> 如果你用到createjs的preload.js来加载连续图片组合成序列桢动画，因为加载成功后已经生成成了img元素，CssSprite直接用img标签来渲染。

##### backgroundImage渲染
> 如果序列桢不想做成sprite图片，可以把单个图片直接转成base64，base64加载完后，CssSprite自动判断用backgroundImage直接渲染相应序列桢的base64图片。

## License

所有代码采用 [MIT License](http://opensource.org/licenses/MIT) 开源。
