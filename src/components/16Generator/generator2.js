// https://github.com/57code/frontend/blob/master/doc/Generator.md

// 2. 生成器函数在执行时能暂停，后面又能从暂停处继续执行：
function* g() {
  yield 'a';
  yield 'b';
  yield 'c';
  return 'ending';
}

var gen = g()
// console.log(gen.next()) // {value: "a", done: false}
// console.log(gen.next()) // {value: "b", done: false}
// console.log(gen.next()) // {value: "c", done: false}
// console.log(gen.next()) // {value: "ending", done: true}
// console.log(gen.next()) // { value: undefined, done: true }

// 利用递归执行生成器中所有步骤:
function next() {
  const {value, done} = gen.next()
  console.log(value) // 依次打印输出 a b c end
  if(!done) next() // 直到全部完成
}
next()