// https://github.com/57code/frontend/blob/master/doc/Generator.md

// 3. 通过next()传值
/**
 * 3.1 以yield为界的暂停 '1'不会赋值给a,而是赋值给{value:'1'}
 * 3.2 
 */
function* say() {
    let a = yield '1'

    // 3.2 这里打印出的,必须通过.next()以参数传进来:
    console.log(a)

    let b = yield '2'

    // 3.2 这里打印出的,必须通过.next()以参数传进来:
    console.log(b)
}

// let it = say() // 返回迭代器
// /*
// a的值并非赋值给1，而是下次next参数
// !!!!!且第一次next()无法传参!!!!!!
// */
// console.log(it.next('heh')) 
// //  { value: '1', done: false }


// // 如果next()里有传值:则先打印出所传的值: 输出如下:
// console.log(it.next('我是被传进来的东西1'))
// // 我我是被传进来的东西1
// // { value: '2', done: false }

// console.log(it.next('我是被传进来的东西2'))
// // 我是被传进来的东西2
// // { value: undefined, done: true }

/**
 * 解决第一次需要传参的问题:
 */

function* say2(foo) {
  let a = yield foo
  console.log(a)
  let b = yield '2'
  console.log(b)
}

// !!!!第一次传参需要通过构造函数里传!!!!
let it2 = say2('第一次传参')
console.log(it2.next());
// { value: '第一次传参', done: false }

console.log(it2.next('我是被传进来的东西111'))
// 我是被传进来的东西111
// { value: '2', done: false }