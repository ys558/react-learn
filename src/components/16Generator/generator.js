// https://github.com/57code/frontend/blob/master/doc/Generator.md

// // 1.定义生成器函数
// function* g() { 
// 	yield 'a';
// 	yield 'b';
// 	yield 'c';
// 	return 'ending';
// }
// // 返回Generator对象
// console.log(g()); // g {<suspended>}
// // Object [Generator] {}
// console.log(g().toString()); // [object Generator]

// // 2. 生成器函数在执行时能暂停，后面又能从暂停处继续执行：
// function* g() {
//   yield 'a';
//   yield 'b';
//   yield 'c';
//   return 'ending';
// }

// var gen = g()
// // console.log(gen.next()) // {value: "a", done: false}
// // console.log(gen.next()) // {value: "b", done: false}
// // console.log(gen.next()) // {value: "c", done: false}
// // console.log(gen.next()) // {value: "ending", done: true}
// // console.log(gen.next()) // { value: undefined, done: true }

// // 利用递归执行生成器中所有步骤:
// function next() {
//   const {value, done} = gen.next()
//   console.log(value) // 依次打印输出 a b c end
//   if(!done) next() // 直到全部完成
// }
// next()

// 3. 通过next()传值
/**
 * 以yield为界的暂停 '1'不会赋值给a,而是赋值给{value:'1'}
 */
function* say() {
    let a = yield '1'
    console.log(a)
    let b = yield '2'
    console.log(b)
}

let it = say() // 返回迭代器

console.log(it.next()) 
//  { value: '1', done: false }
/*
a的值并非赋值给1，而是下次next参数
*/

// 如果next()里有传值:则先打印出所传的值: 输出如下:
console.log(it.next('我是被传进来的东西1'))
// 我我是被传进来的东西1
// { value: '2', done: false }

console.log(it.next('我是被传进来的东西2'))
// 我是被传进来的东西2
// { value: undefined, done: true }