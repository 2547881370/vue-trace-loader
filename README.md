# 安装
```npm
npm install vue-trace-loader -d
npm install vue-function-trace -s
```

# 配置
```js
// vue.config.js

configureWebpack : {
  module : {
    rules : [
      {
        test: /\.vue$/,
        use: 'vue-trace-loader'
      }
    ]
  }
}
```

# 使用api
```js
全局控制台执行

// 打印整个执行调用链
log.getInstance().printTraceList()

// 清楚调用链
log.getInstance().clear()

// 重放调用栈
log.getInstance()replay()
```
