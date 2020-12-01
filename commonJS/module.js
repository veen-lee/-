exports = 'xxxxx';  // 该方式不行 因为是对传递进去的引用赋值，不影响之前的变量
module.exports = 'hello word';
exports.some = 'some';