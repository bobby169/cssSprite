const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')
const glob = require('glob')
const createHTML = require('create-html')
const program = require('commander')

program
  .version('0.1.0')
  .option('-s, --source-dir [dir]', 'Your source image directory')
  .option('-d, --dest-dir [dir]', 'Your dest output directory')
  .parse(process.argv)

if (!program.sourceDir) {
  console.log(`please input source image directory`)
  return
}

if (!program.destDir) {
  program.destDir = `${program.sourceDir}_sprite`
}

const destDir = program.destDir
const destPath = path.join(__dirname, destDir)
const sourceDir = program.sourceDir
const files = glob.sync('**/*', {
  cwd: path.join(__dirname, sourceDir)
})

const entrys = []

if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath)
}

files.forEach((file) => {
  entrys.push(path.join(__dirname, sourceDir, file))
})
console.info(entrys)

// Generate our spritesheet
Spritesmith.run({
  src: entrys,
  padding: 0 // Exaggerated for visibility, normally 1 or 2
}, function handleResult (err, result) {
  // If there was an error, throw it
  if (err) {
    throw err
  }

  // Output the image
  fs.writeFileSync(path.join(__dirname, `${destDir}/sprite.png`), result.image)
  const frames = Object.values(result.coordinates)

  const framesStr = JSON.stringify(frames)
  createSpriteHtml(framesStr)
})

function createSpriteHtml (frames) {
  const script = `
      var sprite = new CssSprite({
        target:'.animation',
        images:'./sprite.png',
        paused: false,
        frames: ${frames},
        animationend: function(){
            console.log('animation End');
        },
        change:function (currentFrame) {
        }
    });
  `
  const cssSprite = path.relative(destPath, path.join(__dirname, '../dist/cssSprite.min.js'))

  const html = createHTML({
    title: 'SpriteCss auto render',
    body: `
        <div class="animation"></div>
        <script src="${cssSprite}"></script>
        <script>${script}</script>
      `
  })
  fs.writeFileSync(path.join(__dirname, `${destDir}/sprite.html`), html)
  fs.writeFileSync(path.join(__dirname, `${destDir}/frames.json`), frames)
}
