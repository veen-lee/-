const path = require('path');
const fs = require('fs');
const vm = require('vm');
/**
 * 模拟nodeJs中reuiqre函数的实现
 * @param {*} pathToModule 需要模块化的路径
 */
function customRequire(pathToModule) {
    const pathToModuleAbs = path.resolve(__dirname, pathToModule);
    const content = fs.readFileSync(pathToModuleAbs, 'utf-8');
    //如果不加小括号，js会将这个字符串当作一个代码段来执行，而并非表达式，而一个函数的声明，恰恰是一个表达式
    const funcWapper = ['(function funcWapper(require,module,exports,__dirname,__filename){\n',
        '})'];
    const ret = `${funcWapper[0]}${content}${funcWapper[1]}`;
    console.log(ret);
    //将字符串编译成可执行代码
    const script = new vm.Script(ret);
    const func = script.runInThisContext();
    const m = { exports: {} };
    func(customRequire, m, m.exports);
    return m.exports;
}

console.log(customRequire('./module.js'));