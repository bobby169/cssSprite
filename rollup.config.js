import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
export default {
  input: 'src/js/cssSprite.js',
  output: {
    file: 'dist/cssSprite.min.js',
    format: 'umd',
    name: 'CssSprite'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    uglify({
      output: {
        comments: /^!/
      }
    })
  ]
}
