module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16, // 基准字体大小，根据设计稿和需要自行调整
        propList: ['*'],
      },
    },
  };