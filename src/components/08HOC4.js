import React from 'react'

const CouseApi = [
  { stage: "React", title: "核心API" },
  { stage: "React", title: "组件化1" },
  { stage: "React", title: "组件化2" }
  ];

// 返回Comp, 用于作为CourseRec的父组件, 自身的父组件为HOC4
const CtxFroCourseApi = Comp => ({index}) => <Comp {...CouseApi[index]}/>

// 从父组件CtxFroCourseApi拿到{stage, title}两个属性
const CourseRec = ({stage, title}) => <div>{`${stage}--${title}`}</div>

// 包装
const Course = CtxFroCourseApi(CourseRec)

// 根组件:
export default () => <>
  {['','',''].map((item,index)=> <Course key={index} index={index}/>)}
  </>