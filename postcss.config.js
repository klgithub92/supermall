//这里是配置css文件的 
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //这里是根据iphone6设计的
      viewportWidth: 375, //视口的宽度，对应的时设计稿的宽度/2，一般为750
      viewportHeight: 667, //视口的高度，对应的是设计稿的高度（也可以不配置）

      unitPrecision: 5, //指定‘px’转换为视口单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视口单位，建议使用vw
      // selectorBlankList: ['ignore', 'tab-bar', 'tab-bar-item', 'nav-bar'], //指定不需要转换的类 如果不想这个标签下的样式单位转换，则在样式class里加ignore
      minPixelValue: 1, //小于或等于‘1px’不转换为视口单位
      mediaQuery: false,//允许在媒体查询中转换为‘px’
      exclude: [/TabBar/]  //不需要转化的组件文件名正则，必须是正则表达式
    }
  }
}