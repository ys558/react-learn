// 结合Promise使用

// 使用Generator顺序执行两次异步操作
function* r(num) {
  const r1 = yield compute(num);
  yield compute(r1);
}

// compute为异步操作，结合Promise使用可以轻松实现异步操作队列
function compute(num) {
  // 返回的Promise本身就是异步
  return new Promise(resolve => {
    // 这里又一个异步
    setTimeout(() => {
      const ret = num * num;
      console.log(ret); // 输出处理结果
      resolve(ret); // 操作成功
    }, 1000);
  });
}

// 不使用递归函数调用
let it = r(2);

// console.log(it.next());
// // {value:Promise { <pending> }, done:false}

// it.next().value.then(num => it.next(num));
// // 4

// 修改为可处理Promise的next
function next(data) {
  let { value, done } = it.next(data); // 启动

  if (!done) {
    // 直到返回了结果,才继续执行下一条语句:
    value.then( num => next(num) )}
}

next();
// 每隔1秒,输出:
// 4
// 16