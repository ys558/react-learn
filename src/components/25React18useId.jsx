import React, { useId } from 'react';

const EmailForm = () => {
  // useId钩子函数，用于生成唯一id值的钩子，以后可不用uuid了
  const id = useId()
  return <form>
    <label htmlFor={id}>Email</label>
    <input type="text" id="email"/>
    <button type="submit">Submit</button>
  </form>
}

export default () => {
  return <div>
    <EmailForm/>
    <EmailForm/>
    {['1','2'].map(i => {
      const key = useId()
      return <div key={key}>
        {i}
    </div>})}
  </div>
}