module.exports = function(source, map) {
    let functionReg = /^\s*\w+\(.*\)\s?\{/
    let methodsReg = /methods.*:.*{/g
    let startScriptReg = /<script.*>/g
    let endScriptReg = /<\/script.*>/g
  
    let scriptFlag = false
    let methodsFlag = false
  
    let oneScriptFlag = true
  
    let codes = source.split('\n')
  
    let content = []
  
    for (let index = 0; index < codes.length; index++) {
      let codeItem = codes[index]
  
      content.push(codeItem)
  
      // 进入script中
      if (!scriptFlag) {
        scriptFlag = startScriptReg.test(codeItem)
  
        if (scriptFlag && oneScriptFlag) {
          content.push("import { logPerformance } from 'vue-function-trace'")
          oneScriptFlag = false
        }
      }
  
      // 离开script
      if (endScriptReg.test(codeItem)) {
        scriptFlag = false
      }
  
      // 当如果在script中时,正则匹配是否进入了methods内部
      if (scriptFlag) {
        if (!methodsFlag) {
          methodsFlag = methodsReg.test(codeItem)
        }
      }
  
      if (scriptFlag && methodsFlag) {
        // 在函数体内部
        // console.log(codeItem)
        if (functionReg.test(codeItem)) {
          // 在methods中所有方法的头部增加装饰器
          let _codeItemCopy = content.pop()
          content.push('@logPerformance')
          content.push(_codeItemCopy)
        }
      }
    }
  
    return content.join("\n")
  }
  