import * as _ from './util'
import {
	renderComponent,
  clearPending,
  // !!!!!!!!!diff算法, 重点:
	compareTwoVnodes,
	getChildContext,
	syncCache
} from './virtual-dom'

// 6. 更新队列
export let updateQueue = {
	updaters: [],
	isPending: false,
	add(updater) {
		this.updaters.push(updater)
  },
  // 批量更新:
	batchUpdate() {
		if (this.isPending) {
			return
		}
		this.isPending = true
		let { updaters } = this
    let updater
    // 把updater里的东西弹出,每个执行updateComponent()
		while (updater = updaters.pop()) {
			updater.updateComponent()
    }
    // 等到队列里没有元素时, 处理状态改为false:
		this.isPending = false
	}
}

// 3. 
class Updater{
	constructor(instance){
		this.instance = instance
		this.pendingStates = [] // 3.1 待处理状态数组
		this.pendingCallbacks = [] // setState()接口里处理完后的回调函数
		this.isPending = false // 是否处理完成
		this.nextProps = this.nextContext = null // 保存传给下一级的props
		this.clearCallbacks = this.clearCallbacks.bind(this) // 清除callback函数
	}

  // 5. 传入两个参数,一个更新属性props, 一个事状态更新context:
	emitUpdate(nextProps, nextContext) {
		this.nextProps = nextProps
		this.nextContext = nextContext
    // receive nextProps!! should update immediately
    // 由于属性引起的更新,则直接更新:如果是状态引起的更新,则加入更新队列等待批量更新
		nextProps || !updateQueue.isPending
		? this.updateComponent()
		: updateQueue.add(this)
  }
  
  // 7. 更新状态的函数:
	updateComponent() {
		let { instance, pendingStates, nextProps, nextContext } = this
		if (nextProps || pendingStates.length > 0) {
			nextProps = nextProps || instance.props
			nextContext = nextContext || instance.context
      this.nextProps = this.nextContext = null
			// getState 合并所有的state的数据，一次更新
			shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks)
		}
  }
  // 4. 
	addState(nextState) {
		if (nextState) {
      // 往3.1容器[]塞了一堆待更新状态:
      this.pendingStates.push(nextState)
      // 如果没有当前没有在更新:则通知他去更新emitUpdate()
			if (!this.isPending) {
				this.emitUpdate()
			}
		}
	}

  // 8. 
	getState() {
		let { instance, pendingStates } = this
		let { state, props } = instance
		if (pendingStates.length) {
			state = {...state}
			pendingStates.forEach(nextState => {
        // 如果传进来是数组,则直接用数组替换原来数组
        let isReplace = _.isArr(nextState)
				if (isReplace) {
					nextState = nextState[0]
        }
        // 如果是函数,则直接更新为函数:
        // 即setState()里如果传的是回调函数, 则可直接多步操作赋值,不会最后一个菜生效,具体实践用例见:src\components\03StateTest.js
				if (_.isFn(nextState)) {
					nextState = nextState.call(instance, state, props)
				}
        // replace state
				if (isReplace) {
          // 如果传进来是数组,则直接用新数组替换原来旧数组
					state = {...nextState}
				} else {
          // 这里就是setState()调用多次之后, 只生效最后一次的原因: nextState新状态只解构了放在旧状态之后
					state = {...state, ...nextState}
				}
			})
			pendingStates.length = 0
		}
		return state
	}
	clearCallbacks() {
		let { pendingCallbacks, instance } = this
		if (pendingCallbacks.length > 0) {
			this.pendingCallbacks = []
			pendingCallbacks.forEach(callback => callback.call(instance))
		}
	}
	addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallbacks.push(callback)
		}
	}
}


export default class Component{
	static isReactComponent = {}

	constructor(props, context){
    // 2. updater由来: 
		this.$updater = new Updater(this)
		this.$cache = { isMounted: false }
		this.props = props
		this.state = {}
		this.refs = {}
		this.context = context
  }
  
  // 11. 
	forceUpdate(callback) {
		// 实际更新组件的函数
		let { $updater, $cache, props, state, context } = this
		if (!$cache.isMounted) {
			return
		}
		if ($updater.isPending) {
        $updater.addState(state)
			return;
    }
    // 拿出所有缓存的属性\状态等
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		let nextContext = $cache.context || context
		let parentContext = $cache.parentContext
		let node = $cache.node
		let vnode = $cache.vnode
		// 缓存
		$cache.props = $cache.state = $cache.context = null
		$updater.isPending = true
		if (this.componentWillUpdate) {
			this.componentWillUpdate(nextProps, nextState, nextContext)
		}
		this.state = nextState
		this.props = nextProps
		this.context = nextContext

    // !!!!!!!!下面才是重点  对比vnode
    // 11.1 调用组件自身的render方法: 得到组件最新的虚拟dom:
    let newVnode = renderComponent(this)
    // 11.2 !!!!!!!!!!!!!Diff算法:对比旧的vnode, 新的vnode,
    let newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext))
    // 11.3 如果新旧vnode对比了不一样:
		if (newNode !== node) {
      // 11.4 则新的虚拟dom等于本身
      newNode.cache = newNode.cache || {}
      // 11.4 并把新节点的内容更新到缓存里:
			syncCache(newNode.cache, node.cache, newNode)
    }
    // 12.5 如果对比了不一样: 则让缓存里的真实节点和虚拟节点直接更新为新的真实和虚拟节点:
		$cache.vnode = newVnode
		$cache.node = newNode
		// 12.6 清除pending 执行didmount生命周期
		clearPending()
		if (this.componentDidUpdate) {
			this.componentDidUpdate(props, state, context)
		}
		if (callback) {
			callback.call(this)
		}
		$updater.isPending = false
		$updater.emitUpdate()
		// 更新
	}
	setState(nextState, callback) {
		// 1.  添加异步队列  不是每次都更新
		this.$updater.addCallback(callback)
		this.$updater.addState(nextState)
	}


}

// 10. 判断是否需要更新
function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	// 是否应该更新 判断shouldComponentUpdate生命周期
	let shouldComponentUpdate = true
	if (component.shouldComponentUpdate) {
		shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext)
	}
	if (shouldComponentUpdate === false) {
		component.props = nextProps
		component.state = nextState
		component.context = nextContext || {}
		return
	}
	let cache = component.$cache
	cache.props = nextProps
	cache.state = nextState
  cache.context = nextContext || {}
  // 强制更新:
	component.forceUpdate(callback)
}
