import React, { useState, memo } from 'react';

const Index =  (props = {}) => {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  const handleSetStep = () => setStep(step + 1)
  const handleSetCount = () => setCount(count + 1)
  const handleCalNumber = () => setNumber(count + step)

  return (
    <div>
      <button onClick={handleSetStep}>step is : {step} </button>
      <button onClick={handleSetCount}>count is : {count} </button>
      <button onClick={handleCalNumber}>numberis : {number} </button>
      <hr />
      <Child step={step} count={count} number={number} />
      <hr />
      <ChildMemo step={step} count={count} number={number} />
    </div>
);
}

export default Index

const Child = (props = {}) => {
  console.log(`----re-render in Child----`)
  return  <div>
  <p>number is : {props.number}</p>
</div>
}

const ChildMemo =  memo((props = {}) => {
  console.log(`--- memo re-render in memo Child ---`);
  return <div>
        <p>wrapped memo number is : {props.number}</p>
      </div>
}, 

// React.memo() 第二个参数也类似 class 的 shouldComponentUpdate，比较前后两个状态的异同，如果一样就不更新
(prevProps, nextProps) => {
  if (prevProps.number !== nextProps.number) return false;

  return true;
});