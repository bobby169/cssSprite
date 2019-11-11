const fs = require('fs')
const path = require('path')
const srcDir = 'work_head'
const dstDir = srcDir + '_Copy2'
const srcPath = path.join(__dirname, srcDir)
const dstPath = path.join(__dirname, dstDir)

if (!fs.existsSync(dstPath)) {
  fs.mkdirSync(dstPath)
}

fs.readdir(srcPath, (err, files) => {
  if (err) throw err
  files.forEach(function (filename) {
    if (/png$/.test(filename) === false) {
      return
    }

    let oldPath = path.join(srcPath, filename)
    let newPath = path.join(dstPath, filename.replace('工作-头_', ''))

    fs.copyFile(oldPath, newPath, (err) => {
      if (err) throw err
      console.log(`${filename} 复制重命名成功!`)
    })
  })
})
