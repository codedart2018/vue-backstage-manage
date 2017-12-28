// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'indent': ['error', 2],
    'eqeqeq': 2,//必须使用全等
    'no-unexpected-multiline': 2,//避免多行表达式
    'no-unreachable': 2,//不能有无法执行的代码
    //'semi': [0], //关闭语句强制分号结尾
    'semi': ['error', 'always'],//语句强制分号结尾
    'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空格
    'no-mixed-spaces-and-tabs': [0],//关闭禁止混用tab和空格
    'no-unused-vars': [2, {
      'vars': 'local',// 允许声明未使用变量
      'args': 'none'// 参数不检查
    }
    ],
    'no-tabs': [0],
    'spaced-comment': [0],
    'camelcase': 2,//强制驼峰法命名
  }
}
