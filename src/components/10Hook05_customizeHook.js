/**
 * @自定义Hook
 * 自定义 Hook 必须以 “use” 开头。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。
 * 在两个组件中使用相同的 Hook 不共享state。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
 */
import React from 'react'

export default function CustomizeHook() {
	return (
		<div>
			
		</div>
	)
}
